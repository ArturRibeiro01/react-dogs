import { useAuthStore } from '@/stores/authStore';
import dogsLogoUrl from '@assets/dogs.svg';

import {
  AccountLink,
  EnvironmentBadge,
  HeaderShell,
  LogoGroup,
  LogoLink,
  Nav,
} from './Header.styles';
import { isDevelopmentEnvironment } from './Header.utils';

const Header = () => {
  const data = useAuthStore((state) => state.data);
  const accountLabel = data?.name || data?.username || data?.email || 'Minha conta';
  const showDevelopmentBadge = isDevelopmentEnvironment();

  return (
    <HeaderShell>
      <Nav>
        <LogoGroup>
          <LogoLink to="/" aria-label="Dogs - Home">
            <img src={dogsLogoUrl} alt="" aria-hidden="true" />
          </LogoLink>
          {showDevelopmentBadge && (
            <EnvironmentBadge title="Ambiente de desenvolvimento">DEV</EnvironmentBadge>
          )}
        </LogoGroup>

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
