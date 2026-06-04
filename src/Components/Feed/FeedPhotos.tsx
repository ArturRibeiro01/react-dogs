import React from 'react';

import { photoApi } from '@/api';
import Error from '@components/Helper/Error';
import Loading from '@components/Helper/Loading';
import useFetch from '@hooks/useFetch';
import type { Photo } from '@/types';

import { EmptyMessage, FeedList } from './FeedPhotos.styles';
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
            <EmptyMessage>
                Nenhuma foto encontrada.
            </EmptyMessage>
        );
    }

    if(data)
        return (
            <FeedList className="animeLeft">
                {data.map((photo) => (
                    <FeedPhotosItem
                        key={photo.id}
                        photo={photo}
                        onSelect={() => onSelectPhoto(photo.id)}
                    />
                ))}
            </FeedList>
        );
        else return null

    
}

export default FeedPhotos
