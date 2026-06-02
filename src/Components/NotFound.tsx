import { Link } from 'react-router-dom';

import styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <section className={`${styles.notFound} container`}>
            <h1 className="title">Página não encontrada</h1>
            <p className={styles.text}>
                O endereço acessado não existe ou foi movido.
            </p>
            <Link className={styles.link} to="/">
                Voltar para o feed
            </Link>
        </section>
    );
};

export default NotFound;
