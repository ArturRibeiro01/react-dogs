import styled from '@emotion/styled';

export const StatsShell = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

export const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  article {
    display: grid;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.radii.sm};
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.875rem;
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 2rem;
    line-height: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;

    strong {
      font-size: 1.75rem;
    }
  }
`;

export const Highlight = styled.div`
  display: grid;
  gap: 0.35rem;
  padding: 1.25rem;
  border-left: 0.5rem solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surfaceMuted};

  span,
  p {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  span {
    font-size: 0.875rem;
  }

  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.75rem;
    line-height: 1;
  }
`;

export const Chart = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

export const ChartRow = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const RowHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};

  h2 {
    font-size: 1rem;
    overflow-wrap: anywhere;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 700;
    white-space: nowrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    align-items: flex-start;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const Track = styled.div`
  height: 1rem;
  overflow: hidden;
  border-radius: 999rem;
  background: ${({ theme }) => theme.colors.borderStrong};

  span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const EmptyStats = styled.p`
  padding: ${({ theme }) => theme.spacing.xxl};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textMuted};
`;
