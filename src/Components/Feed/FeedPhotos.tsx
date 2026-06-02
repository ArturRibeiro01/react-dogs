import React from 'react';

import { photoApi } from '@/api';
import Error from '@components/Helper/Error';
import Loading from '@components/Helper/Loading';
import useFetch from '@hooks/useFetch';
import type { Photo } from '@/types';

import styles from './FeedPhotos.module.css';
import FeedPhotosItem from './FeedPhotosItem';

type FeedPhotosProps = {
    user?: number | string;
    onSelectPhoto: (id: number) => void;
};

const FeedPhotos = ({user = 0, onSelectPhoto}: FeedPhotosProps) => {
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
                    <FeedPhotosItem
                        key={photo.id}
                        photo={photo}
                        onSelect={() => onSelectPhoto(photo.id)}
                    />
                ))}
            </ul>
        );
        else return null

    
}

export default FeedPhotos
