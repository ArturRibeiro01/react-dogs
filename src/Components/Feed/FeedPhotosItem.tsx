import type { Photo } from '@/types';

import { PhotoButton, PhotoItem, PhotoTitle, Views } from './FeedPhotosItem.styles';

type FeedPhotosItemProps = {
  photo: Photo;
  onSelect: () => void;
};

const FeedPhotosItem = ({ photo, onSelect }: FeedPhotosItemProps) => {
  const title = photo.title || photo.nome || 'Foto sem título';
  const views = photo.acessos ?? photo.views;

  return (
    <PhotoItem>
      <PhotoButton type="button" onClick={onSelect} aria-label={`Abrir detalhes da foto ${title}`}>
        <img src={photo.src} alt={title} />
        <Views data-photo-views="true">{views ?? 0}</Views>
        <PhotoTitle>{title}</PhotoTitle>
      </PhotoButton>
    </PhotoItem>
  );
};

export default FeedPhotosItem;
