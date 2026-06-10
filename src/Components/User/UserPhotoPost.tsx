import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { breedsApi, dogApi } from '@/api';
import { dogCreateSchema, type DogCreateFormData } from '@/schemas/forms';
import type { Breed, Dog, DogSize, DogSex } from '@/types';
import Button from '@components/Forms/Button';
import Input from '@components/Forms/Input';
import Error from '@components/Helper/Error';
import useFetch from '@hooks/useFetch';

import { CheckboxLabel, FileLabel, PhotoPostShell, SelectField } from './UserPhotoPost.styles';

const UserPhotoPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DogCreateFormData>({
    resolver: zodResolver(dogCreateSchema),
    mode: 'onBlur',
    defaultValues: {
      sex: '',
      size: '',
      isPublic: true,
    },
  });
  const { data: breeds, error: breedsError, request: requestBreeds } = useFetch<Breed[]>();
  const { data, error, loading, request } = useFetch<Dog>();
  const navigate = useNavigate();

  React.useEffect(() => {
    requestBreeds(() => breedsApi.list());
  }, [requestBreeds]);

  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  function onSubmit({
    name,
    breedId,
    city,
    state,
    weight,
    sex,
    size,
    bio,
    isPublic,
  }: DogCreateFormData) {
    request(() =>
      dogApi.create({
        name,
        breedId,
        city: city || undefined,
        state: state || undefined,
        weight: weight ? Number(weight) : undefined,
        sex: sex ? (sex as DogSex) : undefined,
        size: size ? (size as DogSize) : undefined,
        bio: bio || undefined,
        isPublic,
      }),
    );
  }

  return (
    <PhotoPostShell className="animeLeft">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input label="Nome" type="text" error={errors.name?.message} {...register('name')} />
        <FileLabel htmlFor="breedId">Raça</FileLabel>
        <SelectField id="breedId" aria-invalid={Boolean(errors.breedId)} {...register('breedId')}>
          <option value="">Selecione</option>
          {breeds?.map((breed) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </SelectField>
        <Error error={errors.breedId?.message || breedsError} />
        <Input label="Cidade" type="text" error={errors.city?.message} {...register('city')} />
        <Input label="UF" type="text" error={errors.state?.message} {...register('state')} />
        <Input label="Peso" type="number" error={errors.weight?.message} {...register('weight')} />
        <FileLabel htmlFor="sex">Sexo</FileLabel>
        <SelectField id="sex" {...register('sex')}>
          <option value="">Não informar</option>
          <option value="female">Fêmea</option>
          <option value="male">Macho</option>
          <option value="unknown">Desconhecido</option>
        </SelectField>
        <FileLabel htmlFor="size">Porte</FileLabel>
        <SelectField id="size" {...register('size')}>
          <option value="">Não informar</option>
          <option value="small">Pequeno</option>
          <option value="medium">Médio</option>
          <option value="large">Grande</option>
          <option value="giant">Gigante</option>
        </SelectField>
        <Input label="Bio" type="text" error={errors.bio?.message} {...register('bio')} />
        <CheckboxLabel>
          <input type="checkbox" {...register('isPublic')} />
          Perfil público
        </CheckboxLabel>
        {loading ? <Button disabled>Cadastrando...</Button> : <Button>Cadastrar cachorro</Button>}
        <Error error={error} />
      </form>
    </PhotoPostShell>
  );
};

export default UserPhotoPost;
