import { useAuthStore } from '@/stores/authStore';
import dogsLogoUrl from '@assets/dogs.svg';

import { AccountLink, HeaderShell, LogoLink, Nav } from './Header.styles';

const Header = () => {
  const data = useAuthStore((state) => state.data);
  const accountLabel = data?.name || data?.username || data?.email || 'Minha conta';

  return (
    <HeaderShell>
      <Nav>
        <LogoLink to="/" aria-label="Dogs - Home">
          <img src={dogsLogoUrl} alt="" aria-hidden="true" />
        </LogoLink>

        {data ? (
          <AccountLink to="/conta">{accountLabel}</AccountLink>
        ) : (
          <AccountLink to="/login">Login | Criar</AccountLink>
        )}
      </Nav>
    </HeaderShell>
  );
};

export default Header;
