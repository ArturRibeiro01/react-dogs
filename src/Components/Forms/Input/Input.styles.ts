import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Label = styled.label`
  display: block;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 1rem;
  line-height: 1;
`;

export const Field = styled.input`
  display: block;
  width: 100%;
  padding: 0.8rem;
  border: 0.0625rem solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  outline: none;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: ${({ theme }) => theme.shadows.focus};
    outline: none;
  }
`;

export const FieldError = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.status.errorBorder};
  font-size: 0.875rem;
`;
