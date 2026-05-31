import React from 'react'
import styles from './UserPhotoPost.module.css'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import Error from '../Helper/Error'
import { photoApi, tokenStorage } from '../../api'
import { useNavigate } from 'react-router-dom'
import type { Photo } from '../../types'

type PhotoUploadState = {
    preview?: string;
    raw?: File;
};

const UserPhotoPost = () => {
    const nome = useForm();
    const peso = useForm('number');
    const idade = useForm('number');
    const [img, setImg] = React.useState<PhotoUploadState>({

    });
    const [imgError, setImgError] = React.useState<string | null>(null);
    const {data, error, loading, request} = useFetch<Photo>();
    const navigate = useNavigate();
    
    
    React.useEffect(()=>{
       if(data) navigate('/conta');
    }, [data,navigate]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const file = img.raw;
        const hasImg = Boolean(file);
        setImgError(hasImg ? null : 'Selecione uma imagem.');

        if(!nome.validate() || !peso.validate() || !idade.validate() || !file) return;

        const formData = new FormData();
        formData.append('img', file);
        formData.append('nome', nome.value);
        formData.append('peso', peso.value);
        formData.append('idade', idade.value);

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
            <form onSubmit={handleSubmit}>
                <Input 
                    label="Nome"
                    type="text"
                    name="nome"
                    {...nome} 
                />
                <Input 
                    label="Peso"
                    type="number"
                    name="peso"
                    {...peso}    
                />
                <Input 
                    label="idade"
                    type="number"
                    name="idade"
                    {...idade}    
                />
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
                    <Button disabled>Enviando....</Button>
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
