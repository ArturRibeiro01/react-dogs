import React from 'react'
import FeedModal from './FeedModal'
import FeedPhotos from './FeedPhotos'

type FeedProps = {
    user?: number | string;
};

const Feed = ({user = 0}: FeedProps) => {
    return (
        <div>
            <FeedModal/>
            <FeedPhotos user={user}/>
        </div>
    )
}

export default Feed
