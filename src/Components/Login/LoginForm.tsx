import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { loginSchema, type LoginFormData } from '@/schemas/forms';
import { useAuthStore } from '@/stores/authStore';
import Button, { ButtonLink } from '@components/Forms/Button';
import Input from '@components/Forms/Input';
import Error from '@components/Helper/Error';

import { Form, LostPasswordLink, SignupSection, Subtitle } from './LoginForm.styles';

const LoginForm = () => {
  const navigate = useNavigate();
  const error = useAuthStore((state) => state.error);
  const loading = useAuthStore((state) => state.loading);
  const userLogin = useAuthStore((state) => state.userLogin);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  async function onSubmit({ username, password }: LoginFormData) {
    const success = await userLogin(username, password);
    if (success) navigate('/conta');
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Usuário"
          type="text"
          error={errors.username?.message}
          {...register('username')}
        />
        <Input
          label="Senha"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
        {loading ? <Button disabled>Carregando...</Button> : <Button>Entrar</Button>}
        <Error error={error} />
      </Form>
      <LostPasswordLink to="/login/perdeu">Perdeu a senha?</LostPasswordLink>
      <SignupSection>
        <Subtitle>Cadastre-se</Subtitle>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <ButtonLink to="/login/criar">Cadastro</ButtonLink>
      </SignupSection>
    </section>
  );
};

export default LoginForm;
