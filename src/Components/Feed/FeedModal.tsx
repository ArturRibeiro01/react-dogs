import { useEffect, useRef } from 'react';

import { postsApi } from '@/api';
import type { Post } from '@/types';
import Error from '@components/Helper/Error';
import Loading from '@components/Helper/Loading';
import useFetch from '@hooks/useFetch';

import {
  Author,
  CloseButton,
  Comments,
  Details,
  EmptyComment,
  ImageWrap,
  ModalArticle,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Overlay,
  StatsList,
  Views,
} from './FeedModal.styles';

type FeedModalProps = {
  postId: string;
  onClose: () => void;
};

const FeedModal = ({ postId, onClose }: FeedModalProps) => {
  const { data: post, loading, error, request } = useFetch<Post>();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    };
  }, []);

  useEffect(() => {
    async function fetchPost() {
      await request(() => postsApi.get(postId));
    }

    fetchPost();
  }, [postId, request]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const title = post?.caption || post?.dog?.name || 'Post sem título';
  const imageUrl = post?.media?.[0]?.url || post?.dog?.avatarUrl;

  return (
    <Overlay onClick={onClose} role="presentation">
      <ModalArticle
        role="dialog"
        aria-modal="true"
        aria-labelledby="feed-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <CloseButton
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes da foto"
        />

        {error && <Error error={error} />}
        {loading && <Loading />}

        {post && (
          <ModalContent>
            <ImageWrap>{imageUrl && <img src={imageUrl} alt={title} />}</ImageWrap>

            <Details>
              <ModalHeader>
                <Author>@{post.author?.username || post.dog?.slug || 'dogs'}</Author>
                <ModalTitle id="feed-modal-title">{title}</ModalTitle>
                <Views>0</Views>
              </ModalHeader>

              <StatsList>
                <div>
                  <dt>Cachorro</dt>
                  <dd>{post.dog?.name || 'Não informado'}</dd>
                </div>
                <div>
                  <dt>Raça</dt>
                  <dd>{post.dog?.breed?.name || 'Não informada'}</dd>
                </div>
              </StatsList>

              <Comments aria-label="Legenda">
                {post.caption ? (
                  <p>{post.caption}</p>
                ) : (
                  <EmptyComment>Nenhuma legenda.</EmptyComment>
                )}
              </Comments>
            </Details>
          </ModalContent>
        )}
      </ModalArticle>
    </Overlay>
  );
};

export default FeedModal;
