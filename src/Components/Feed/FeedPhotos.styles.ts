import styled from '@emotion/styled';

export const EmptyMessage = styled.p`
  display: grid;
  min-height: 12rem;
  place-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  margin: 0;
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

export const LegacyPhotoContent = styled.article`
  display: grid;
  height: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.sm};

  img {
    grid-area: 1 / 1;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
`;
