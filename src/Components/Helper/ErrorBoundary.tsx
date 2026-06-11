import { Component, type ErrorInfo, type ReactNode } from 'react';

import {
  ErrorActionButton,
  ErrorActions,
  ErrorBoundaryContainer,
  ErrorPanel,
  ErrorText,
  ErrorTitle,
} from './ErrorBoundary.styles';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Erro capturado pelo ErrorBoundary:', error, info);
    }
  }

  reset = () => {
    this.setState({ hasError: false });
  };

  reload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <ErrorBoundaryContainer className="container">
        <ErrorPanel role="alert" aria-live="assertive">
          <ErrorTitle>Algo saiu do ar</ErrorTitle>
          <ErrorText>
            O app encontrou um erro inesperado. Tente novamente ou recarregue a página.
          </ErrorText>
          <ErrorActions>
            <ErrorActionButton type="button" onClick={this.reset}>
              Tentar novamente
            </ErrorActionButton>
            <ErrorActionButton $variant="secondary" type="button" onClick={this.reload}>
              Recarregar página
            </ErrorActionButton>
          </ErrorActions>
        </ErrorPanel>
      </ErrorBoundaryContainer>
    );
  }
}

export default ErrorBoundary;
