import { useEffect } from 'react';

import { photoApi, postsApi } from '@/api';
import type { Photo, Post } from '@/types';
import Error from '@components/Helper/Error';
import Loading from '@components/Helper/Loading';
import useFetch from '@hooks/useFetch';

import { PhotoItem, PhotoTitle } from './FeedPhotosItem.styles';
import { EmptyMessage, FeedList, LegacyPhotoContent } from './FeedPhotos.styles';
import FeedPhotosItem from './FeedPhotosItem';

type FeedPhotosProps = {
  user?: number | string;
  onSelectPost: (id: string) => void;
};

const FeedPhotos = ({ user = 0, onSelectPost }: FeedPhotosProps) => {
  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
    request: requestPosts,
  } = useFetch<Post[]>();
  const {
    data: legacyPhotos,
    loading: legacyLoading,
    error: legacyError,
    request: requestLegacyPhotos,
  } = useFetch<Photo[]>();

  useEffect(() => {
    async function fetchFeed() {
      await Promise.all([
        requestPosts(() => postsApi.list({ page: 1, perPage: 6 })),
        requestLegacyPhotos(() => photoApi.list({ page: 1, total: 6, user: 0 })),
      ]);
    }
    fetchFeed();
  }, [requestLegacyPhotos, requestPosts, user]);

  const loading = postsLoading || legacyLoading;
  const hasPosts = Boolean(posts?.length);
  const hasLegacyPhotos = Boolean(legacyPhotos?.length);

  if (loading && !posts && !legacyPhotos) return <Loading />;
  if (!hasPosts && !hasLegacyPhotos && (postsError || legacyError)) {
    return <Error error={postsError || legacyError} />;
  }
  if (!hasPosts && !hasLegacyPhotos) {
    return <EmptyMessage>Nenhum post encontrado.</EmptyMessage>;
  }

  return (
    <FeedList className="animeLeft">
      {posts?.map((post) => (
        <FeedPhotosItem key={post.id} post={post} onSelect={() => onSelectPost(post.id)} />
      ))}
      {legacyPhotos?.map((photo) => {
        const title = photo.title || photo.nome || 'Cachorro';

        return (
          <PhotoItem key={`legacy-${photo.id}`}>
            <LegacyPhotoContent>
              <img src={photo.src} alt={title} />
              <PhotoTitle>{title}</PhotoTitle>
            </LegacyPhotoContent>
          </PhotoItem>
        );
      })}
    </FeedList>
  );
};

export default FeedPhotos;
