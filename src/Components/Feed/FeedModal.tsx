import React from 'react'
import { photoApi } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import styles from './FeedModal.module.css';
import type { PhotoDetails } from '../../types';

type FeedModalProps = {
    photoId: number;
    onClose: () => void;
};

const FeedModal = ({photoId, onClose}: FeedModalProps) => {
    const {data, loading, error, request} = useFetch<PhotoDetails>();
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
    const title = photo?.title || photo?.nome || 'Foto sem titulo';
    const views = photo?.acessos ?? photo?.views ?? 0;

    return (
        <div
            className={styles.overlay}
            onClick={onClose}
            role="presentation"
        >
            <article
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="feed-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    ref={closeButtonRef}
                    className={styles.close}
                    type="button"
                    onClick={onClose}
                    aria-label="Fechar detalhes da foto"
                />

                {error && <Error error={error} />}
                {loading && <Loading />}

                {photo && (
                    <div className={styles.content}>
                        <div className={styles.imageWrap}>
                            <img src={photo.src} alt={title} />
                        </div>

                        <div className={styles.details}>
                            <header className={styles.header}>
                                <p className={styles.author}>@{photo.author || 'dogs'}</p>
                                <h2 id="feed-modal-title" className={styles.title}>
                                    {title}
                                </h2>
                                <span className={styles.views}>{views}</span>
                            </header>

                            <dl className={styles.stats}>
                                <div>
                                    <dt>Peso</dt>
                                    <dd>{photo.peso || 0} kg</dd>
                                </div>
                                <div>
                                    <dt>Idade</dt>
                                    <dd>{photo.idade || 0} anos</dd>
                                </div>
                            </dl>

                            <section className={styles.comments} aria-label="Comentarios">
                                {data.comments.length > 0 ? (
                                    data.comments.map((comment) => (
                                        <p key={comment.comment_ID}>
                                            <strong>{comment.comment_author}: </strong>
                                            <span>{comment.comment_content}</span>
                                        </p>
                                    ))
                                ) : (
                                    <p className={styles.empty}>Nenhum comentario ainda.</p>
                                )}
                            </section>
                        </div>
                    </div>
                )}
            </article>
        </div>
    )
}

export default FeedModal
