import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const buttonStyles = ({ theme }: { theme: Theme }) => css`
  display: inline-block;
  min-width: 8rem;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.radii.md};
  box-sizing: border-box;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.primaryText};
  cursor: pointer;
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  line-height: 1.2;
  text-align: center;
  transition: ${theme.transitions.slow};

  &:hover,
  &:focus {
    outline: none;
    box-shadow: ${theme.shadows.focusStrong};
  }

  &:disabled {
    opacity: 0.5;
    cursor: wait;
  }
`;

export const StyledButton = styled.button`
  ${buttonStyles}
`;

export const ButtonLink = styled(Link)`
  ${buttonStyles}
`;
