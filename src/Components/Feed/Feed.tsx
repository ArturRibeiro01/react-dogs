import React from 'react'
import FeedModal from './FeedModal'
import FeedPhotos from './FeedPhotos'

type FeedProps = {
    user?: number | string;
};

const Feed = ({user = 0}: FeedProps) => {
    const [modalPhotoId, setModalPhotoId] = React.useState<number | null>(null);

    return (
        <div>
            {modalPhotoId && (
                <FeedModal
                    photoId={modalPhotoId}
                    onClose={() => setModalPhotoId(null)}
                />
            )}
            <FeedPhotos user={user} onSelectPhoto={setModalPhotoId}/>
        </div>
    )
}

export default Feed
