import styled from '@emotion/styled';

import viewsIconUrl from '@assets/visualizacao-black.svg';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndices.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  background: ${({ theme }) => theme.colors.overlay};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: flex-start;
    padding: ${({ theme }) => theme.spacing.lg};
    overflow: auto;
  }
`;

export const ModalArticle = styled.article`
  position: relative;
  width: min(56rem, 100%);
  max-height: calc(100vh - 4rem);
  overflow: auto;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.modal};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-height: none;
    overflow: visible;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
  z-index: ${({ theme }) => theme.zIndices.base};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border: 4px solid ${({ theme }) => theme.colors.surface};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 1.25rem;
    height: 0.125rem;
    border-radius: ${({ theme }) => theme.radii.sm};
    background: ${({ theme }) => theme.colors.text};
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &:hover,
  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    top: ${({ theme }) => theme.spacing.sm};
    right: ${({ theme }) => theme.spacing.sm};
    width: 2.75rem;
    height: 2.75rem;
    border-width: 3px;
  }
`;

export const ModalContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(18rem, 0.85fr);
  min-height: 30rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    min-height: 0;
  }
`;

export const ImageWrap = styled.div`
  background: ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    img {
      aspect-ratio: 1;
    }
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};
  padding: ${({ theme }) => theme.spacing.xxxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.25rem;
  }
`;

export const ModalHeader = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Author = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
`;

export const ModalTitle = styled.h2`
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.base};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.5rem;
  line-height: 1;

  &::after {
    content: '';
    position: absolute;
    left: -0.25rem;
    bottom: 0.125rem;
    z-index: ${({ theme }) => theme.zIndices.below};
    width: 1.25rem;
    height: 1.25rem;
    border-radius: ${({ theme }) => theme.radii.sm};
    background: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

export const Views = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;

  &::before {
    content: '';
    display: inline-block;
    width: 1rem;
    height: 0.625rem;
    margin-right: ${({ theme }) => theme.spacing.xs};
    background: url(${viewsIconUrl}) no-repeat center center;
  }
`;

export const StatsList = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: 0;

  div {
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.radii.sm};
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }

  dt {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.875rem;
  }

  dd {
    margin: ${({ theme }) => theme.spacing.xs} 0 0;
    font-weight: 700;
  }
`;

export const Comments = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  line-height: 1.4;
`;

export const EmptyComment = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;
