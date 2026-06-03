import { Link } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';
import Dogs from '@assets/dogs.svg?react';

import styles from './Header.module.css';

const Header = () => {
    const data = useAuthStore((state) => state.data);

    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} container`}>
                <Link
                    to="/"
                    className={styles.logo}
                    aria-label="Dogs - Home"
                >
                    <Dogs />
                </Link>

                {data ? (
                    <Link className={styles.login} to="/conta">
                        {data.nome}
                    </Link>
                ) : (
                    <Link to="/login" className={styles.login}>
                        Login | Criar
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
