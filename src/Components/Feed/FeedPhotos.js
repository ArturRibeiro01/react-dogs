import React from 'react'
import { PHOTOS_GET } from '../../Api';
import useFetch from '../../Hooks/useFetch';
import FeedPhotosItem from './FeedPhotosItem';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';

const FeedPhotos = () => {
    const {data, loading, error, request} = useFetch();

    React.useEffect(() => {
        async function fetchPhotos() {
            const {url, options} = PHOTOS_GET({page: 1, total: 6, user: 0});
            const {response, json} = await request(url, options);

        }
        fetchPhotos();
    }, [request]);

    if(error) return <Error error={error}/>
    if(loading) return <Loading/>
    if(data)

        return (
            <ul>
                teste 2
            </ul>
        );
        else return null

    
}

export default FeedPhotos
