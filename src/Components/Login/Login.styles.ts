import styled from '@emotion/styled';

import loginImageUrl from '@assets/login.jpg';

export const LoginShell = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  gap: ${({ theme }) => theme.spacing.xxxl};

  &::before {
    display: block;
    content: '';
    background: url(${loginImageUrl}) no-repeat center center;
    background-size: cover;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;

    &::before {
      display: none;
    }
  }
`;

export const LoginForms = styled.div`
  max-width: 30rem;
  padding: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
  }
`;
