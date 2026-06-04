import styled from '@emotion/styled';

export const AccountHeader = styled.header`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
`;
