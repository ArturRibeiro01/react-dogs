import React from 'react';

import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';

type FeedProps = {
  user?: number | string;
};

const Feed = ({ user = 0 }: FeedProps) => {
  const [modalPostId, setModalPostId] = React.useState<string | null>(null);

  return (
    <div>
      {modalPostId && <FeedModal postId={modalPostId} onClose={() => setModalPostId(null)} />}
      <FeedPhotos user={user} onSelectPost={setModalPostId} />
    </div>
  );
};

export default Feed;
