import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { passwordApi } from '@/api';
import { renderWithProviders } from '@/test/renderWithProviders';
import type { ApiResponse } from '@/types';

import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';

vi.mock('@/api', () => ({
  passwordApi: {
    lost: vi.fn(),
    reset: vi.fn(),
  },
}));

const createApiResponse = <TData,>(data: TData): ApiResponse<TData> => ({
  response: new Response(null, { status: 200 }),
  data,
});

const mockedLost = vi.mocked(passwordApi.lost);
const mockedReset = vi.mocked(passwordApi.reset);

const renderPasswordLost = () =>
  renderWithProviders(
    <Routes>
      <Route path="/login/perdeu" element={<LoginPasswordLost />} />
    </Routes>,
    { initialEntries: ['/login/perdeu'] },
  );

const renderPasswordReset = (url: string) =>
  renderWithProviders(
    <Routes>
      <Route path="/login/resetar" element={<LoginPasswordReset />} />
      <Route path="/login" element={<p>Tela de login</p>} />
    </Routes>,
    { initialEntries: [url] },
  );

describe('Login password recovery', () => {
  beforeEach(() => {
    mockedLost.mockReset();
    mockedReset.mockReset();
  });

  it('validates the password lost form before submitting', async () => {
    renderPasswordLost();

    await userEvent.click(screen.getByRole('button', { name: /enviar e-mail/i }));

    expect(await screen.findByText('Preencha este campo.')).toBeInTheDocument();
    expect(mockedLost).not.toHaveBeenCalled();
  });

  it('requests a password recovery link and shows success feedback', async () => {
    mockedLost.mockResolvedValue(createApiResponse(null));

    renderPasswordLost();
    await userEvent.type(screen.getByLabelText(/e-mail \/ usuário/i), 'demo');
    await userEvent.click(screen.getByRole('button', { name: /enviar e-mail/i }));

    await waitFor(() => {
      expect(mockedLost).toHaveBeenCalledWith({
        login: 'demo',
        url: expect.stringContaining('/login/resetar'),
      });
    });
    expect(
      await screen.findByText('E-mail enviado. Verifique sua caixa de entrada.'),
    ).toBeInTheDocument();
  });

  it('shows an invalid reset link message when key or login is missing', () => {
    renderPasswordReset('/login/resetar');

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Link de redefinição inválido ou incompleto.',
    );
    expect(screen.getByRole('link', { name: /solicitar novo link/i })).toHaveAttribute(
      'href',
      '/login/perdeu',
    );
  });

  it('resets the password and shows success feedback', async () => {
    mockedReset.mockResolvedValue(createApiResponse(null));

    renderPasswordReset('/login/resetar?key=abc&login=demo');
    await userEvent.type(screen.getByLabelText(/nova senha/i), 'Demo1234');
    await userEvent.click(screen.getByRole('button', { name: /redefinir senha/i }));

    await waitFor(() => {
      expect(mockedReset).toHaveBeenCalledWith({
        login: 'demo',
        key: 'abc',
        password: 'Demo1234',
      });
    });
    expect(await screen.findByText('Senha redefinida com sucesso.')).toBeInTheDocument();
  });
});
