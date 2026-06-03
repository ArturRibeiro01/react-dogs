import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { passwordApi } from '@/api';
import { passwordLostSchema, type PasswordLostFormData } from '@/schemas/forms';
import Button from '@components/Forms/Button';
import Input from '@components/Forms/Input';
import Error from '@components/Helper/Error';
import StatusMessage from '@components/Helper/StatusMessage';
import useFetch from '@hooks/useFetch';

import styles from './LoginForm.module.css';

const LoginPasswordLost = () => {
  const { error, loading, request } = useFetch();
  const [success, setSuccess] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordLostFormData>({
    resolver: zodResolver(passwordLostSchema),
    mode: 'onBlur',
  });

  async function onSubmit({ login }: PasswordLostFormData) {
    setSuccess(null);

    const resetUrl = `${window.location.origin}${import.meta.env.BASE_URL}login/resetar`;
    const { response } = await request(() =>
      passwordApi.lost({
        login,
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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="E-mail / Usuário"
          type="text"
          error={errors.login?.message}
          {...register('login')}
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
