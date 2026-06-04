import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Form = styled.form`
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

export const LostPasswordLink = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: currentColor;
  }
`;

export const SignupSection = styled.div`
  margin-top: 4rem;

  p {
    margin-top: ${({ theme }) => theme.spacing.xxxl};
    margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  }
`;

export const Subtitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  line-height: 1;

  &::after {
    content: '';
    display: block;
    width: 3rem;
    height: 0.5rem;
    border-radius: ${({ theme }) => theme.radii.sm};
    background: ${({ theme }) => theme.colors.borderStrong};
  }
`;
