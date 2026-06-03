import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { passwordApi } from '@/api';
import { passwordResetSchema, type PasswordResetFormData } from '@/schemas/forms';
import Button from '@components/Forms/Button';
import Input from '@components/Forms/Input';
import Error from '@components/Helper/Error';
import StatusMessage from '@components/Helper/StatusMessage';
import useFetch from '@hooks/useFetch';

import styles from './LoginForm.module.css';

const LoginPasswordReset = () => {
  const { error, loading, request } = useFetch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [success, setSuccess] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
    mode: 'onBlur',
  });

  const key = searchParams.get('key');
  const login = searchParams.get('login');
  const invalidUrl = !key || !login;

  async function onSubmit({ password }: PasswordResetFormData) {
    setSuccess(null);

    if (!login || !key) return;

    const { response } = await request(() =>
      passwordApi.reset({
        login,
        key,
        password,
      }),
    );

    if (response?.ok) {
      setSuccess('Senha redefinida com sucesso.');
      window.setTimeout(() => navigate('/login'), 1200);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Resetar senha</h1>
      {invalidUrl ? (
        <>
          <Error error="Link de redefinição inválido ou incompleto." />
          <Link className={styles.perdeu} to="/login/perdeu">
            Solicitar novo link
          </Link>
        </>
      ) : (
        <>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              label="Nova senha"
              type="password"
              error={errors.password?.message}
              {...register('password')}
            />
            {loading ? (
              <Button disabled>Redefinindo...</Button>
            ) : (
              <Button>Redefinir Senha</Button>
            )}
            <Error error={error} />
            {success && <StatusMessage variant="success">{success}</StatusMessage>}
          </form>
          <Link className={styles.perdeu} to="/login">
            Voltar para login
          </Link>
        </>
      )}
    </section>
  );
};

export default LoginPasswordReset;
