import { useEffect } from 'react';

import { postsApi } from '@/api';
import type { Post } from '@/types';
import Error from '@components/Helper/Error';
import Loading from '@components/Helper/Loading';
import useFetch from '@hooks/useFetch';

import { EmptyMessage, FeedList } from './FeedPhotos.styles';
import FeedPhotosItem from './FeedPhotosItem';

type FeedPhotosProps = {
  user?: number | string;
  onSelectPost: (id: string) => void;
};

const FeedPhotos = ({ user = 0, onSelectPost }: FeedPhotosProps) => {
  const { data, loading, error, request } = useFetch<Post[]>();

  useEffect(() => {
    async function fetchPosts() {
      await request(() =>
        postsApi.list({
          page: 1,
          perPage: 6,
        }),
      );
    }
    fetchPosts();
  }, [request, user]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data && data.length === 0) {
    return <EmptyMessage>Nenhum post encontrado.</EmptyMessage>;
  }

  if (data)
    return (
      <FeedList className="animeLeft">
        {data.map((post) => (
          <FeedPhotosItem key={post.id} post={post} onSelect={() => onSelectPost(post.id)} />
        ))}
      </FeedList>
    );
  else return null;
};

export default FeedPhotos;
