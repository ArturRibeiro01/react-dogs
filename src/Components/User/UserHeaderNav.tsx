import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';
import adicionarFotoUrl from '@assets/adicionar.svg';
import estatisticasUrl from '@assets/estatisticas.svg';
import minhasFotosUrl from '@assets/feed.svg';
import sairUrl from '@assets/sair.svg';
import { useMedia } from '@hooks/useMedia';

import { AccountNav, MobileMenuButton, NavIcon } from './UserHeaderNav.styles';

const UserHeaderNav = () => {
  const userLogout = useAuthStore((state) => state.userLogout);
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navId = 'user-account-navigation';

  async function handleLogout() {
    await userLogout();
    navigate('/login');
  }

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <MobileMenuButton
          aria-controls={navId}
          aria-expanded={mobileMenu}
          aria-label={mobileMenu ? 'Fechar menu da conta' : 'Abrir menu da conta'}
          $isOpen={mobileMenu}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></MobileMenuButton>
      )}
      <AccountNav id={navId} aria-label="Navegação da conta" $mobile={mobile} $isOpen={mobileMenu}>
        <NavLink to="/conta" end aria-label="Minhas fotos">
          <NavIcon src={minhasFotosUrl} alt="" aria-hidden="true" />
          {mobile && 'Minhas Fotos'}
        </NavLink>

        <NavLink to="/conta/estatisticas" aria-label="Estatísticas">
          <NavIcon src={estatisticasUrl} alt="" aria-hidden="true" />
          {mobile && 'Estatísticas'}
        </NavLink>

        <NavLink to="/conta/postar" aria-label="Adicionar cachorro">
          <NavIcon src={adicionarFotoUrl} alt="" aria-hidden="true" />
          {mobile && 'Adicionar Cachorro'}
        </NavLink>

        <button onClick={handleLogout} aria-label="Sair da conta">
          <NavIcon src={sairUrl} alt="" aria-hidden="true" />
          {mobile && 'Sair'}
        </button>
      </AccountNav>
    </>
  );
};

export default UserHeaderNav;
