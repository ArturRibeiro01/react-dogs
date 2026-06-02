import type { Photo } from '@/types';

import styles from './FeedPhotosItem.module.css';

type FeedPhotosItemProps = {
    photo: Photo;
    onSelect: () => void;
};

const FeedPhotosItem = ({photo, onSelect}: FeedPhotosItemProps) => {
    const title = photo.title || photo.nome || 'Foto sem título';
    const views = photo.acessos ?? photo.views;

    return (
        <li className={styles.photo}>
            <button
                className={styles.button}
                type="button"
                onClick={onSelect}
                aria-label={`Abrir detalhes da foto ${title}`}
            >
                <img src={photo.src} alt={title} />
                <span className={styles.views}>
                    {views ?? 0}
                </span>
                <span className={styles.title}>{title}</span>
            </button>
        </li>
    );
}

export default FeedPhotosItem
