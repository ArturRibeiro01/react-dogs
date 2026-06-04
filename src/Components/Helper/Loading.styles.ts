import styled from '@emotion/styled';

export const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.xxl} 0;
  color: ${({ theme }) => theme.colors.textMuted};

  &::before {
    content: '';
    width: 1rem;
    height: 1rem;
    border: 3px solid ${({ theme }) => theme.colors.borderStrong};
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
