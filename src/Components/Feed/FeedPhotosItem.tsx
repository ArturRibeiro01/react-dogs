import type { Post } from '@/types';

import { PhotoButton, PhotoItem, PhotoTitle, Views } from './FeedPhotosItem.styles';

type FeedPhotosItemProps = {
  post: Post;
  onSelect: () => void;
};

const FeedPhotosItem = ({ post, onSelect }: FeedPhotosItemProps) => {
  const title = post.caption || post.dog?.name || 'Post sem título';
  const imageUrl = post.media?.[0]?.url || post.dog?.avatarUrl;

  return (
    <PhotoItem>
      <PhotoButton type="button" onClick={onSelect} aria-label={`Abrir detalhes do post ${title}`}>
        {imageUrl && <img src={imageUrl} alt={title} />}
        <Views data-photo-views="true">0</Views>
        <PhotoTitle>{title}</PhotoTitle>
      </PhotoButton>
    </PhotoItem>
  );
};

export default FeedPhotosItem;
