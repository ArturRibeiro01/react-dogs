import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { useAuthStore } from '@/stores/authStore';

import ProtectedRoute from './ProtectedRoute';

const renderProtectedRoute = () =>
  render(
    <MemoryRouter
      initialEntries={['/conta']}
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Routes>
        <Route
          path="/conta"
          element={
            <ProtectedRoute>
              <p>Área logada</p>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<p>Tela de login</p>} />
      </Routes>
    </MemoryRouter>,
  );

describe('ProtectedRoute', () => {
  beforeEach(() => {
    useAuthStore.setState({
      data: null,
      login: null,
      loading: false,
      error: null,
    });
  });

  it('renders children when user is authenticated', () => {
    useAuthStore.setState({ login: true });

    renderProtectedRoute();

    expect(screen.getByText('Área logada')).toBeInTheDocument();
  });

  it('redirects to login when user is unauthenticated', () => {
    useAuthStore.setState({ login: false });

    renderProtectedRoute();

    expect(screen.getByText('Tela de login')).toBeInTheDocument();
  });

  it('renders nothing while auth status is unknown', () => {
    renderProtectedRoute();

    expect(screen.queryByText('Área logada')).not.toBeInTheDocument();
    expect(screen.queryByText('Tela de login')).not.toBeInTheDocument();
  });
});
