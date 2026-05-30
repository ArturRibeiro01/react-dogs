import React from 'react'
import FeedModal from './FeedModal'
import FeedPhotos from './FeedPhotos'

const Feed = ({user = 0}) => {
    return (
        <div>
            <FeedModal/>
            <FeedPhotos user={user}/>
        </div>
    )
}

export default Feed
