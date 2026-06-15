import styled from '@emotion/styled';

export const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: 12rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};

  &::before {
    content: '';
    width: 1rem;
    height: 1rem;
    border: 0.1875rem solid ${({ theme }) => theme.colors.borderStrong};
    border-top-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
