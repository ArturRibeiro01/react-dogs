import { ThemeProvider } from '@emotion/react';
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { theme } from '@/styles/theme';

type RenderWithProvidersOptions = RenderOptions & {
  initialEntries?: string[];
};

const routerFuture = {
  v7_relativeSplatPath: true,
  v7_startTransition: true,
};

export const renderWithProviders = (
  ui: ReactElement,
  { initialEntries = ['/'], ...options }: RenderWithProvidersOptions = {},
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={initialEntries} future={routerFuture}>
        {children}
      </MemoryRouter>
    </ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};
