import React from 'react';
import { Link } from 'react-router-dom';

import { passwordApi } from '@/api';
import Button from '@components/Forms/Button';
import Input from '@components/Forms/Input';
import Error from '@components/Helper/Error';
import StatusMessage from '@components/Helper/StatusMessage';
import useFetch from '@hooks/useFetch';
import useForm from '@hooks/useForm';

import styles from './LoginForm.module.css';

const LoginPasswordLost = () => {
  const login = useForm();
  const { error, loading, request } = useFetch();
  const [success, setSuccess] = React.useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(null);

    if (!login.validate()) return;

    const resetUrl = `${window.location.origin}${import.meta.env.BASE_URL}login/resetar`;
    const { response } = await request(() =>
      passwordApi.lost({
        login: login.value,
        url: resetUrl,
      }),
    );

    if (response?.ok) {
      setSuccess('E-mail enviado. Verifique sua caixa de entrada.');
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Perdeu a senha?</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="E-mail / Usuário"
          type="text"
          name="login"
          {...login}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar e-mail</Button>
        )}
        <Error error={error} />
        {success && <StatusMessage variant="success">{success}</StatusMessage>}
      </form>
      <Link className={styles.perdeu} to="/login">
        Voltar para login
      </Link>
    </section>
  );
};

export default LoginPasswordLost;
