import styled from '@emotion/styled';

type PreviewProps = {
  $imageUrl: string;
};

export const PhotoPostShell = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxxl};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const FileLabel = styled.label`
  display: block;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 1rem;
  line-height: 1;
`;

export const FileInput = styled.input`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 0.875rem;
`;

export const SelectField = styled.select`
  display: block;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
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

export const CheckboxLabel = styled.label`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Preview = styled.div<PreviewProps>`
  border-radius: ${({ theme }) => theme.radii.sm};
  background-image: url('${({ $imageUrl }) => $imageUrl}');
  background-size: cover;
  background-position: center center;

  &::after {
    content: '';
    display: block;
    height: 0;
    padding-bottom: 100%;
  }
`;
