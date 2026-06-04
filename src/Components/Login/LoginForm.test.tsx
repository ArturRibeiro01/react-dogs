import { ThemeProvider } from '@emotion/react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { theme } from '@/styles/theme';
import { useAuthStore } from '@/stores/authStore';

import LoginForm from './LoginForm';

const renderLoginForm = () =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter
        initialEntries={['/login']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/conta" element={<p>Minha conta</p>} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );

describe('LoginForm', () => {
  beforeEach(() => {
    useAuthStore.setState({
      data: null,
      login: false,
      loading: false,
      error: null,
      userLogin: vi.fn().mockResolvedValue(true),
    });
  });

  it('shows validation messages for empty submit', async () => {
    const userLogin = vi.fn().mockResolvedValue(true);
    useAuthStore.setState({ userLogin });

    renderLoginForm();
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(await screen.findAllByText('Preencha este campo.')).toHaveLength(2);
    expect(userLogin).not.toHaveBeenCalled();
  });

  it('calls auth store and navigates after successful login', async () => {
    const userLogin = vi.fn().mockResolvedValue(true);
    useAuthStore.setState({ userLogin });

    renderLoginForm();
    await userEvent.type(screen.getByLabelText('Usuário'), 'demo');
    await userEvent.type(screen.getByLabelText('Senha'), 'Demo1234');
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(userLogin).toHaveBeenCalledWith('demo', 'Demo1234');
    });
    expect(await screen.findByText('Minha conta')).toBeInTheDocument();
  });
});
