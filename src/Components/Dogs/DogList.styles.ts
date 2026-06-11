import styled from '@emotion/styled';

export const Filters = styled.form`
  display: grid;
  grid-template-columns: minmax(12rem, 1fr) minmax(10rem, 0.75fr) minmax(7rem, 0.5fr) auto;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: end;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const FieldGroup = styled.div`
  label {
    display: block;
    padding-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: 1rem;
    line-height: 1;
  }

  input,
  select {
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
  }

  input:focus,
  input:hover,
  select:focus,
  select:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: ${({ theme }) => theme.shadows.focus};
    outline: none;
  }
`;

export const DogCard = styled.li`
  display: grid;
  min-height: 16rem;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.borderInset};
`;

export const DogImage = styled.div<{ $imageUrl?: string | null }>`
  min-height: 13rem;
  background:
    linear-gradient(135deg, rgb(251 177 19 / 85%), rgb(255 255 255 / 10%)),
    ${({ $imageUrl }) => ($imageUrl ? `url('${$imageUrl}')` : 'none')};
  background-color: ${({ theme }) => theme.colors.primary};
  background-position: center;
  background-size: cover;
`;

export const DogInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};

  h2 {
    margin: 0 0 ${({ theme }) => theme.spacing.xs};
    font-size: 1.125rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.875rem;
  }
`;
