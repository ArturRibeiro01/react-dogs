import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { passwordApi } from '@/api';
import { passwordResetSchema, type PasswordResetFormData } from '@/schemas/forms';
import Button from '@components/Forms/Button';
import Input from '@components/Forms/Input';
import Error from '@components/Helper/Error';
import StatusMessage from '@components/Helper/StatusMessage';
import useFetch from '@hooks/useFetch';

import { Form, LostPasswordLink } from './LoginForm.styles';

const LoginPasswordReset = () => {
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState<string | null>(null);
  const recoveryError = new URLSearchParams(window.location.hash.slice(1)).get('error_code');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
    mode: 'onTouched',
  });

  async function onSubmit({ password }: PasswordResetFormData) {
    setSuccess(null);

    const { response } = await request(() =>
      passwordApi.reset({
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
      {recoveryError ? (
        <>
          <StatusMessage variant="error">
            Este link de recuperação é inválido ou expirou. Solicite um novo e-mail.
          </StatusMessage>
          <LostPasswordLink to="/login/perdeu">Solicitar novo link</LostPasswordLink>
        </>
      ) : (
        <>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              label="Nova senha"
              type="password"
              error={errors.password?.message}
              {...register('password')}
            />
            {loading ? <Button disabled>Redefinindo...</Button> : <Button>Redefinir Senha</Button>}
            <Error error={error} />
            {success && <StatusMessage variant="success">{success}</StatusMessage>}
          </Form>
          <LostPasswordLink to="/login">Voltar para login</LostPasswordLink>
        </>
      )}
    </section>
  );
};

export default LoginPasswordReset;
