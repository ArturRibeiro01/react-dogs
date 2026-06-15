import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { renderWithProviders } from '@/test/renderWithProviders';

import Header from './Header';
import { isDevelopmentEnvironment } from './Header.utils';

describe('Header', () => {
  beforeEach(() => {
    useAuthStore.setState({
      data: null,
      login: false,
      loading: false,
      error: null,
    });
  });

  it('renders the logo link and login link for guests', () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole('link', { name: /dogs - home/i })).toHaveAttribute('href', '/');
    expect(screen.getByText('DEV')).toHaveAttribute('title', 'Ambiente de desenvolvimento');
    expect(screen.getByRole('link', { name: /login \| criar/i })).toHaveAttribute('href', '/login');
  });

  it('renders the user account link when authenticated', () => {
    useAuthStore.setState({
      data: {
        id: 'user-1',
        username: 'demo',
        name: 'Demo',
        email: 'demo@dogs.local',
      },
      login: true,
    });

    renderWithProviders(<Header />);

    expect(screen.getByRole('link', { name: 'Demo' })).toHaveAttribute('href', '/conta');
  });

  it('identifies local and published development environments', () => {
    expect(isDevelopmentEnvironment('/')).toBe(true);
    expect(isDevelopmentEnvironment('/react-dogs/dev/')).toBe(true);
    expect(isDevelopmentEnvironment('/react-dogs/')).toBe(false);
  });
});
