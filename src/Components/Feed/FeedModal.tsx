import React from 'react';

import { photoApi } from '@/api';
import Error from '@components/Helper/Error';
import Loading from '@components/Helper/Loading';
import useFetch from '@hooks/useFetch';
import type { PhotoDetails } from '@/types';

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
  photoId: number;
  onClose: () => void;
};

const FeedModal = ({ photoId, onClose }: FeedModalProps) => {
  const { data, loading, error, request } = useFetch<PhotoDetails>();
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const previousFocusRef = React.useRef<Element | null>(null);

  React.useEffect(() => {
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

  React.useEffect(() => {
    async function fetchPhoto() {
      await request(() => photoApi.get(photoId));
    }

    fetchPhoto();
  }, [photoId, request]);

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const photo = data?.photo;
  const title = photo?.title || photo?.nome || 'Foto sem título';
  const views = photo?.acessos ?? photo?.views ?? 0;

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

        {photo && (
          <ModalContent>
            <ImageWrap>
              <img src={photo.src} alt={title} />
            </ImageWrap>

            <Details>
              <ModalHeader>
                <Author>@{photo.author || 'dogs'}</Author>
                <ModalTitle id="feed-modal-title">{title}</ModalTitle>
                <Views>{views}</Views>
              </ModalHeader>

              <StatsList>
                <div>
                  <dt>Peso</dt>
                  <dd>{photo.peso || 0} kg</dd>
                </div>
                <div>
                  <dt>Idade</dt>
                  <dd>{photo.idade || 0} anos</dd>
                </div>
              </StatsList>

              <Comments aria-label="Comentários">
                {data.comments.length > 0 ? (
                  data.comments.map((comment) => (
                    <p key={comment.comment_ID}>
                      <strong>{comment.comment_author}: </strong>
                      <span>{comment.comment_content}</span>
                    </p>
                  ))
                ) : (
                  <EmptyComment>Nenhum comentário ainda.</EmptyComment>
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
