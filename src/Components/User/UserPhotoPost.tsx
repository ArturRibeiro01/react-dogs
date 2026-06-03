import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { photoApi, tokenStorage } from '@/api';
import { photoPostSchema, type PhotoPostFormData } from '@/schemas/forms';
import type { Photo } from '@/types';
import Button from '@components/Forms/Button';
import Input from '@components/Forms/Input';
import Error from '@components/Helper/Error';
import useFetch from '@hooks/useFetch';

import styles from './UserPhotoPost.module.css';

type PhotoUploadState = {
    preview?: string;
    raw?: File;
};

const UserPhotoPost = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PhotoPostFormData>({
        resolver: zodResolver(photoPostSchema),
        mode: 'onBlur',
    });
    const [img, setImg] = React.useState<PhotoUploadState>({

    });
    const [imgError, setImgError] = React.useState<string | null>(null);
    const {data, error, loading, request} = useFetch<Photo>();
    const navigate = useNavigate();
    
    
    React.useEffect(()=>{
       if(data) navigate('/conta');
    }, [data,navigate]);

    function onSubmit({ nome, peso, idade }: PhotoPostFormData){
        const file = img.raw;
        const hasImg = Boolean(file);
        setImgError(hasImg ? null : 'Selecione uma imagem.');

        if(!file) return;

        const formData = new FormData();
        formData.append('img', file);
        formData.append('nome', nome);
        formData.append('peso', peso);
        formData.append('idade', idade);

        const token = tokenStorage.get();
        request(() => photoApi.create(formData, token));
    }

    function handleImgChange({target}: React.ChangeEvent<HTMLInputElement>){
        const file = target.files?.[0];
        if(!file) {
            setImg({});
            setImgError('Selecione uma imagem.');
            return;
        }

        if(img.preview) URL.revokeObjectURL(img.preview);
        setImgError(null);
        setImg({
            preview: URL.createObjectURL(file),
            raw: file,
        });
    }

    React.useEffect(() => {
        return () => {
            if(img.preview) URL.revokeObjectURL(img.preview);
        };
    }, [img.preview]);

    return (
        <section className={`${styles.photoPost} animeLeft`} >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Input 
                    label="Nome"
                    type="text"
                    error={errors.nome?.message}
                    {...register('nome')}
                />
                <Input 
                    label="Peso"
                    type="number"
                    error={errors.peso?.message}
                    {...register('peso')}
                />
                <Input 
                    label="Idade"
                    type="number"
                    error={errors.idade?.message}
                    {...register('idade')}
                />
                <label className={styles.fileLabel} htmlFor="img">
                    Imagem
                </label>
                <input
                    className={styles.file}
                    type="file"
                    name="img"
                    id="img"
                    accept="image/*"
                    onChange={handleImgChange}
                />
                <Error error={imgError} />
                {loading ? (
                    <Button disabled>Enviando...</Button>
                ) : (
                    <Button>Enviar</Button>
                )}
                <Error error={error} />
                
            </form>
            <div>
                {img.preview && (
                    <div
                        className = {styles.preview} 
                        style={{backgroundImage: `url('${img.preview}')`}}
                    ></div>
                )}
            </div>
        </section>
    )
}

export default UserPhotoPost
