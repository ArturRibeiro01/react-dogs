import React from 'react'
import styles from './FeedPhotosItem.module.css'

const FeedPhotosItem = ({photo}) => {
    const title = photo.title || photo.nome || 'Foto sem titulo';
    const views = photo.acessos ?? photo.views;

    return (
        <li className={styles.photo}>
            <img src={photo.src} alt={title} />
            <span className={styles.views}>
                {views ?? 0}
            </span>
            <p className={styles.title}>{title}</p>
        </li>
    );
}

export default FeedPhotosItem
