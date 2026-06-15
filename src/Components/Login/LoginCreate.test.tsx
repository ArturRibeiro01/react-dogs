import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { renderWithProviders } from '@/test/renderWithProviders';

import LoginCreate from './LoginCreate';

const renderLoginCreate = () =>
  renderWithProviders(
    <Routes>
      <Route path="/login/criar" element={<LoginCreate />} />
    </Routes>,
    { initialEntries: ['/login/criar'] },
  );

describe('LoginCreate', () => {
  beforeEach(() => {
    useAuthStore.setState({
      data: null,
      login: false,
      loading: false,
      error: null,
      userSignup: vi.fn().mockResolvedValue(false),
    });
  });

  it('clears the password error while a valid password is entered', async () => {
    renderLoginCreate();

    const passwordInput = screen.getByLabelText('Senha');
    await userEvent.type(passwordInput, 'fraca');
    await userEvent.tab();

    const passwordError = await screen.findByText(/a senha precisa ter no mínimo 8 caracteres/i);
    expect(passwordError).toBeInTheDocument();

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'Dogs@1234');

    await waitFor(() => {
      expect(passwordError).not.toBeInTheDocument();
    });
  });
});
