import React from 'react';
import { NavLink, useLocation, useNavigate, type NavLinkRenderProps } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';
import AdicionarFoto from '@assets/adicionar.svg?react';
import Estatisticas from '@assets/estatisticas.svg?react';
import MinhasFotos from '@assets/feed.svg?react';
import Sair from '@assets/sair.svg?react';
import { useMedia } from '@hooks/useMedia';

import styles from './UserHeaderNav.module.css';


const UserHeaderNav = () => {
    const userLogout = useAuthStore((state) => state.userLogout);
    const mobile = useMedia('(max-width: 40rem)');
    const [mobileMenu, setMobileMenu] = React.useState(false);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const getActiveClassName = ({isActive}: NavLinkRenderProps) => isActive ? styles.active : undefined;
    const navId = 'user-account-navigation';

    function handleLogout() {
        userLogout();
        navigate('/login');
    }

    
    React.useEffect(() => {
        setMobileMenu(false);
    },[ pathname ]);

    return (
        <>
        {mobile && (
            <button 
                aria-controls={navId}
                aria-expanded={mobileMenu}
                aria-label={mobileMenu ? 'Fechar menu da conta' : 'Abrir menu da conta'}
                className={`
                    ${styles.mobileButton}
                    ${ mobileMenu && styles.mobileButtonActive}
                `}
                onClick={()=> setMobileMenu(!mobileMenu)
                }>
            </button>
        )}
        <nav 
            id={navId}
            aria-label="Navegação da conta"
            className= {`
                ${mobile ? styles.navMobile : styles.nav} 
                ${mobileMenu && styles.navMobileActive}`
            }>
            <NavLink to="/conta" end className={getActiveClassName} aria-label="Minhas fotos">
                <MinhasFotos aria-hidden="true"/>
                {mobile && 'Minhas Fotos'}
            </NavLink>

            <NavLink to="/conta/estatisticas" className={getActiveClassName} aria-label="Estatísticas">
                <Estatisticas aria-hidden="true"/>
                {mobile && 'Estatísticas'}
            </NavLink>

            <NavLink to="/conta/postar" className={getActiveClassName} aria-label="Adicionar foto">
                <AdicionarFoto aria-hidden="true"/>
                {mobile && 'Adicionar Foto'}
            </NavLink>

            <button onClick={handleLogout} aria-label="Sair da conta">
                <Sair aria-hidden="true"/>
                {mobile && 'Sair'}
            </button>
        </nav>
        </>
    )
}

export default UserHeaderNav
