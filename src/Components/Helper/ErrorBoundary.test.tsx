import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/renderWithProviders';

import ErrorBoundary from './ErrorBoundary';

const ThrowError = () => {
  throw new Error('Falha de renderização.');
};

describe('ErrorBoundary', () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

  beforeEach(() => {
    consoleError.mockClear();
  });

  afterEach(() => {
    consoleError.mockClear();
  });

  it('renders children when no error is thrown', () => {
    renderWithProviders(
      <ErrorBoundary>
        <p>Conteúdo normal</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Conteúdo normal')).toBeInTheDocument();
  });

  it('renders fallback when a child throws', () => {
    renderWithProviders(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Algo saiu do ar');
  });

  it('tries to render children again when reset is clicked', async () => {
    let shouldThrow = true;

    const MaybeThrow = () => {
      if (shouldThrow) throw new Error('Falha temporária.');
      return <p>Recuperado</p>;
    };

    renderWithProviders(
      <ErrorBoundary>
        <MaybeThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Algo saiu do ar');

    shouldThrow = false;
    await userEvent.click(screen.getByRole('button', { name: /tentar novamente/i }));

    expect(screen.getByText('Recuperado')).toBeInTheDocument();
  });
});
