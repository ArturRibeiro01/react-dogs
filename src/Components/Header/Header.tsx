import { useAuthStore } from '@/stores/authStore';
import Dogs from '@assets/dogs.svg?react';

import { AccountLink, HeaderShell, LogoLink, Nav } from './Header.styles';

const Header = () => {
  const data = useAuthStore((state) => state.data);

  return (
    <HeaderShell>
      <Nav>
        <LogoLink to="/" aria-label="Dogs - Home">
          <Dogs />
        </LogoLink>

        {data ? (
          <AccountLink to="/conta">{data.nome}</AccountLink>
        ) : (
          <AccountLink to="/login">Login | Criar</AccountLink>
        )}
      </Nav>
    </HeaderShell>
  );
};

export default Header;
