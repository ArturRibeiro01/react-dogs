import React from 'react'
import { photoApi } from '../../api';
import useFetch from '../../Hooks/useFetch';
import FeedPhotosItem from './FeedPhotosItem';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';

const FeedPhotos = () => {
    const {data, loading, error, request} = useFetch();

    React.useEffect(() => {
        async function fetchPhotos() {
            await request(() => photoApi.list({page: 1, total: 6, user: 0}));
        }
        fetchPhotos();
    }, [request]);

    if(error) return <Error error={error}/>
    if(loading) return <Loading/>
    if(data)
        return (
            <ul>
                {data.map((photo) => (
                    <FeedPhotosItem key={photo.id} photo={photo} />
                ))}
            </ul>
        );
        else return null

    
}

export default FeedPhotos
