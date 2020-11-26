import React from 'react'

const FeedPhotosItem = ({photo}) => {
    return (
        <li>
            <img src={photo.src} alt={photo.title}/>
        </li>
    )
}

export default FeedPhotosItem
