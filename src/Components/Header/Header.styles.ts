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

  img {
    display: block;
  }
`;

export const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const EnvironmentBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xxs} ${({ theme }) => theme.spacing.sm};
  border: 0.0625rem solid #9c2f24;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: #fff1f0;
  color: #7f1d14;
  font-size: 0.6875rem;
  font-weight: 700;
  line-height: 1.4;
`;

export const AccountLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  &::after {
    content: '';
    display: inline-block;
    width: 0.875rem;
    height: 1.0625rem;
    margin-left: ${({ theme }) => theme.spacing.sm};
    position: relative;
    top: -0.0625rem;
    background: url(${userIconUrl}) no-repeat center center;
  }
`;
