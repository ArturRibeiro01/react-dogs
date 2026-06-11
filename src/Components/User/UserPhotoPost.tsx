import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { dogApi, mediaApi, postsApi } from '@/api';
import { postUploadSchema, type PostUploadFormData } from '@/schemas/forms';
import type { Dog, Media, Post } from '@/types';
import Button from '@components/Forms/Button';
import Error from '@components/Helper/Error';
import useFetch from '@hooks/useFetch';

import {
  FileInput,
  FileLabel,
  PhotoPostShell,
  Preview,
  SelectField,
  TextAreaField,
} from './UserPhotoPost.styles';

const UserPhotoPost = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostUploadFormData>({
    resolver: zodResolver(postUploadSchema),
    mode: 'onBlur',
  });
  const { data: dogs, error: dogsError, request: requestDogs } = useFetch<Dog[]>();
  const { error: postError, loading: postLoading, request: requestPost } = useFetch<Post>();
  const { error: mediaError, loading: mediaLoading, request: requestMedia } = useFetch<Media>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const navigate = useNavigate();
  const selectedFile = watch('file');

  useEffect(() => {
    requestDogs(() => dogApi.list({ perPage: 100 }));
  }, [requestDogs]);

  useEffect(() => {
    const file = selectedFile?.[0];
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    if (!URL.createObjectURL) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  async function onSubmit({ dogId, caption, file }: PostUploadFormData) {
    const image = file[0];
    setUploadError(null);

    const postResult = await requestPost(() =>
      postsApi.create({
        dogId,
        caption: caption || undefined,
        visibility: 'public',
      }),
    );

    if (!postResult.json) return;

    const createdPost = postResult.json;
    const mediaResult = await requestMedia(() =>
      mediaApi.create({
        postId: createdPost.id,
        file: image,
      }),
    );

    if (!mediaResult.json) {
      setUploadError('Post criado, mas não foi possível enviar a imagem.');
      return;
    }

    navigate('/conta');
  }

  const loading = postLoading || mediaLoading;
  const error = uploadError || postError || mediaError;

  return (
    <PhotoPostShell className="animeLeft">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FileLabel htmlFor="dogId">Cachorro</FileLabel>
        <SelectField id="dogId" aria-invalid={Boolean(errors.dogId)} {...register('dogId')}>
          <option value="">Selecione</option>
          {dogs?.map((dog) => (
            <option key={dog.id} value={dog.id}>
              {dog.name}
            </option>
          ))}
        </SelectField>
        <Error error={errors.dogId?.message || dogsError || null} />

        <FileLabel htmlFor="caption">Legenda</FileLabel>
        <TextAreaField
          id="caption"
          aria-invalid={Boolean(errors.caption)}
          {...register('caption')}
        />
        <Error error={errors.caption?.message || null} />

        <FileLabel htmlFor="file">Imagem</FileLabel>
        <FileInput
          id="file"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          {...register('file')}
        />
        <Error error={errors.file?.message || null} />

        {loading ? <Button disabled>Publicando...</Button> : <Button>Publicar</Button>}
        <Error error={error} />
      </form>
      {previewUrl && <Preview $imageUrl={previewUrl} aria-label="Prévia da imagem selecionada" />}
    </PhotoPostShell>
  );
};

export default UserPhotoPost;
