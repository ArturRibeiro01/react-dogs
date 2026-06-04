import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const NotFoundSection = styled.section`
  display: grid;
  align-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  min-height: 50vh;
`;

export const NotFoundText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`;

export const NotFoundLink = styled(Link)`
  justify-self: start;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryText};
  font-weight: 700;

  &:hover,
  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusStrong};
  }
`;
