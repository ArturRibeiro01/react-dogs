import styled from '@emotion/styled';

export const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  margin: ${({ theme }) => theme.spacing.xxxl} 0;
`;

export const FeedList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
