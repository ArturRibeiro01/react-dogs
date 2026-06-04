import styled from '@emotion/styled';

export const ErrorBoundaryContainer = styled.main`
  display: grid;
  align-content: center;
  justify-items: start;
  min-height: 60vh;
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.lg};
`;

export const ErrorPanel = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  width: min(100%, 32rem);
  padding: ${({ theme }) => theme.spacing.xxl};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

export const ErrorTitle = styled.h1`
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
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`;

export const ErrorActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ErrorActionButton = styled.button<{ $variant?: 'secondary' }>`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ $variant, theme }) =>
    $variant === 'secondary' ? theme.colors.surface : theme.colors.primary};
  color: ${({ $variant, theme }) =>
    $variant === 'secondary' ? theme.colors.text : theme.colors.primaryText};
  box-shadow: ${({ $variant, theme }) =>
    $variant === 'secondary' ? theme.shadows.borderInset : 'none'};
  cursor: pointer;
  font-weight: 700;

  &:hover,
  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;
