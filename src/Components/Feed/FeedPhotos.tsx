import React from 'react'
import { photoApi } from '../../api';
import useFetch from '../../Hooks/useFetch';
import FeedPhotosItem from './FeedPhotosItem';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import styles from './FeedPhotos.module.css';
import type { Photo } from '../../types';

type FeedPhotosProps = {
    user?: number | string;
};

const FeedPhotos = ({user = 0}: FeedPhotosProps) => {
    const {data, loading, error, request} = useFetch<Photo[]>();

    React.useEffect(() => {
        async function fetchPhotos() {
            await request(() => photoApi.list({page: 1, total: 6, user}));
        }
        fetchPhotos();
    }, [request, user]);

    if(error) return <Error error={error}/>
    if(loading) return <Loading/>
    if(data && data.length === 0) {
        return (
            <p className={styles.empty}>
                Nenhuma foto encontrada.
            </p>
        );
    }

    if(data)
        return (
            <ul className={`${styles.feed} animeLeft`}>
                {data.map((photo) => (
                    <FeedPhotosItem key={photo.id} photo={photo} />
                ))}
            </ul>
        );
        else return null

    
}

export default FeedPhotos
