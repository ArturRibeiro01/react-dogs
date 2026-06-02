import React from 'react';

import { statsApi, tokenStorage } from '@/api';
import Error from '@components/Helper/Error';
import Loading from '@components/Helper/Loading';
import useFetch from '@hooks/useFetch';
import type { PhotoStats } from '@/types';

import styles from './UserStats.module.css';

const UserStats = () => {
    const {data, loading, error, request} = useFetch<PhotoStats[]>();

    React.useEffect(() => {
        async function fetchStats() {
            const token = tokenStorage.get();
            await request(() => statsApi.list(token));
        }

        fetchStats();
    }, [request]);

    const stats = React.useMemo(() => {
        if (!data) return [];
        return [...data].sort((a, b) => b.acessos - a.acessos);
    }, [data]);

    const totalViews = stats.reduce((total, photo) => total + photo.acessos, 0);
    const totalPhotos = stats.length;
    const averageViews = totalPhotos ? Math.round(totalViews / totalPhotos) : 0;
    const maxViews = Math.max(...stats.map((photo) => photo.acessos), 1);
    const topPhoto = stats[0];

    if (loading) return <Loading/>
    if (error) return <Error error={error}/>

    if (data && stats.length === 0) {
        return (
            <section className={`${styles.stats} animeLeft`}>
                <p className={styles.empty}>
                    Publique sua primeira foto para acompanhar as estatísticas.
                </p>
            </section>
        );
    }

    if (!data) return null;

    return (
        <section className={`${styles.stats} animeLeft`}>
            <div className={styles.summary}>
                <article>
                    <span>Total de acessos</span>
                    <strong>{totalViews.toLocaleString('pt-BR')}</strong>
                </article>

                <article>
                    <span>Fotos publicadas</span>
                    <strong>{totalPhotos}</strong>
                </article>

                <article>
                    <span>Média por foto</span>
                    <strong>{averageViews.toLocaleString('pt-BR')}</strong>
                </article>
            </div>

            {topPhoto && (
                <div className={styles.highlight}>
                    <span>Foto mais acessada</span>
                    <strong>{topPhoto.title}</strong>
                    <p>{topPhoto.acessos.toLocaleString('pt-BR')} acessos</p>
                </div>
            )}

            <div className={styles.chart} aria-label="Acessos por foto">
                {stats.map((photo, index) => {
                    const percentage = Math.max((photo.acessos / maxViews) * 100, 4);

                    return (
                        <article key={`${photo.id || photo.title}-${index}`} className={styles.row}>
                            <div className={styles.rowHeader}>
                                <h2>{photo.title}</h2>
                                <span>{photo.acessos.toLocaleString('pt-BR')}</span>
                            </div>

                            <div
                                className={styles.track}
                                role="meter"
                                aria-label={`${photo.title}: ${photo.acessos} acessos`}
                                aria-valuemin={0}
                                aria-valuemax={maxViews}
                                aria-valuenow={photo.acessos}
                            >
                                <span style={{width: `${percentage}%`}} />
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    )
}

export default UserStats
