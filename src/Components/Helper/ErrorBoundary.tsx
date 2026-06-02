import React from 'react';
import styles from './ErrorBoundary.module.css';

type ErrorBoundaryProps = {
    children: React.ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
    };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return {hasError: true};
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        if (import.meta.env.DEV) {
            console.error('Erro capturado pelo ErrorBoundary:', error, info);
        }
    }

    reset = () => {
        this.setState({hasError: false});
    };

    reload = () => {
        window.location.reload();
    };

    render() {
        if (!this.state.hasError) return this.props.children;

        return (
            <main className={`${styles.container} container`}>
                <section className={styles.panel} role="alert" aria-live="assertive">
                    <h1 className={styles.title}>Algo saiu do ar</h1>
                    <p className={styles.text}>
                        O app encontrou um erro inesperado. Tente novamente ou recarregue a página.
                    </p>
                    <div className={styles.actions}>
                        <button className={styles.button} type="button" onClick={this.reset}>
                            Tentar novamente
                        </button>
                        <button
                            className={`${styles.button} ${styles.secondary}`}
                            type="button"
                            onClick={this.reload}
                        >
                            Recarregar página
                        </button>
                    </div>
                </section>
            </main>
        );
    }
}

export default ErrorBoundary;
