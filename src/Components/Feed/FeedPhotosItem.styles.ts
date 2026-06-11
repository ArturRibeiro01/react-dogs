import styled from '@emotion/styled';

import viewsIconUrl from '@assets/visualizacao.svg';

export const PhotoItem = styled.li`
  display: grid;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.sm};

  &:nth-of-type(2) {
    grid-column: span 2;
    grid-row: span 2;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    &:nth-of-type(2) {
      grid-column: initial;
      grid-row: initial;
    }
  }
`;

export const PhotoButton = styled.button`
  display: grid;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: none;
  cursor: pointer;
  overflow: hidden;
  text-align: left;

  &:focus {
    outline: 0.1875rem solid ${({ theme }) => theme.colors.primary};
    outline-offset: 0.1875rem;
  }

  img {
    grid-area: 1 / 1;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }

  &:hover [data-photo-views='true'],
  &:focus [data-photo-views='true'] {
    display: flex;
  }
`;

export const Views = styled.span`
  align-items: center;
  background: ${({ theme }) => theme.colors.overlaySoft};
  color: ${({ theme }) => theme.colors.surface};
  display: none;
  font-size: 1rem;
  grid-area: 1 / 1;
  justify-content: center;

  &::before {
    content: '';
    display: inline-block;
    width: 1rem;
    height: 0.625rem;
    margin-right: ${({ theme }) => theme.spacing.xs};
    background: url(${viewsIconUrl}) no-repeat center center;
  }
`;

export const PhotoTitle = styled.span`
  align-self: end;
  grid-area: 1 / 1;
  padding: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(transparent, ${({ theme }) => theme.colors.overlayStrong});
  color: ${({ theme }) => theme.colors.surface};
  font-size: 0.875rem;
  font-weight: 700;
  overflow-wrap: anywhere;
`;
