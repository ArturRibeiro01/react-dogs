import styled from '@emotion/styled';

export type StatusMessageVariant = 'error' | 'success' | 'info';

const variants = {
  error: {
    border: 'errorBorder',
    background: 'errorBackground',
    text: 'errorText',
  },
  success: {
    border: 'successBorder',
    background: 'successBackground',
    text: 'successText',
  },
  info: {
    border: 'primary',
    background: 'infoBackground',
    text: 'infoText',
  },
} as const;

export const Message = styled.p<{ $variant: StatusMessageVariant }>`
  margin: ${({ theme }) => theme.spacing.lg} 0;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-left: 0.35rem solid
    ${({ theme, $variant }) => {
      const color = variants[$variant].border;
      return color === 'primary' ? theme.colors.primary : theme.colors.status[color];
    }};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme, $variant }) => theme.colors.status[variants[$variant].background]};
  color: ${({ theme, $variant }) => theme.colors.status[variants[$variant].text]};
  line-height: 1.4;
`;
