import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { renderWithProviders } from '@/test/renderWithProviders';
import { useMedia } from '@hooks/useMedia';

import UserHeaderNav from './UserHeaderNav';

vi.mock('@hooks/useMedia', () => ({
  useMedia: vi.fn(),
}));

const mockedUseMedia = vi.mocked(useMedia);

const renderUserHeaderNav = (initialEntry = '/conta') =>
  renderWithProviders(
    <Routes>
      <Route path="/conta/*" element={<UserHeaderNav />} />
      <Route path="/login" element={<p>Tela de login</p>} />
    </Routes>,
    { initialEntries: [initialEntry] },
  );

describe('UserHeaderNav', () => {
  beforeEach(() => {
    mockedUseMedia.mockReturnValue(false);
    useAuthStore.setState({
      data: {
        id: 'user-1',
        username: 'demo',
        name: 'Demo',
        email: 'demo@dogs.local',
      },
      login: true,
      loading: false,
      error: null,
    });
  });

  it('renders account navigation links', () => {
    renderUserHeaderNav();

    expect(screen.getByRole('link', { name: /minhas fotos/i })).toHaveAttribute('href', '/conta');
    expect(screen.getByRole('link', { name: /estatísticas/i })).toHaveAttribute(
      'href',
      '/conta/estatisticas',
    );
    expect(screen.getByRole('link', { name: /adicionar foto/i })).toHaveAttribute(
      'href',
      '/conta/postar',
    );
  });

  it('marks the current route as active', () => {
    renderUserHeaderNav('/conta/estatisticas');

    expect(screen.getByRole('link', { name: /estatísticas/i })).toHaveClass('active');
  });

  it('logs out and navigates to login', async () => {
    const userLogout = vi.fn();
    useAuthStore.setState({ userLogout });

    renderUserHeaderNav();
    await userEvent.click(screen.getByRole('button', { name: /sair da conta/i }));

    expect(userLogout).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Tela de login')).toBeInTheDocument();
  });

  it('toggles the mobile menu button state', async () => {
    mockedUseMedia.mockReturnValue(true);

    renderUserHeaderNav();

    const menuButton = screen.getByRole('button', { name: /abrir menu da conta/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(menuButton);

    expect(screen.getByRole('button', { name: /fechar menu da conta/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });
});
