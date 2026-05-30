import React from 'react'

const FeedPhotosItem = ({photo}) => {
    return (
        <li>
            <img src={photo.src} alt={photo.title} />
            <span>{photo.title}</span>
        </li>
    );
}

export default FeedPhotosItem
