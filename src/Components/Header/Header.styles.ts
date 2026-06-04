import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import userIconUrl from '@assets/usuario.svg';

export const HeaderShell = styled.header`
  width: 100%;
  top: 0;
  z-index: ${({ theme }) => theme.zIndices.header};
  box-shadow: ${({ theme }) => theme.shadows.header};
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 50rem;
  height: 4rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

export const LogoLink = styled(Link)`
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

export const AccountLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  &::after {
    content: '';
    display: inline-block;
    width: 14px;
    height: 17px;
    margin-left: ${({ theme }) => theme.spacing.sm};
    position: relative;
    top: -1px;
    background: url(${userIconUrl}) no-repeat center center;
  }
`;
