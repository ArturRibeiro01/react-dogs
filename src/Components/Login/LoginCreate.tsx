import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { createUserSchema, type CreateUserFormData } from '@/schemas/forms';
import { useAuthStore } from '@/stores/authStore';
import Button from '@components/Forms/Button';
import Input from '@components/Forms/Input';
import Error from '@components/Helper/Error';

const LoginCreate = () => {
  const navigate = useNavigate();
  const userSignup = useAuthStore((state) => state.userSignup);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    mode: 'onBlur',
  });

  async function onSubmit({ username, email, password }: CreateUserFormData) {
    const success = await userSignup({ username, email, password });
    if (success) navigate('/conta');
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Usuário"
          type="text"
          error={errors.username?.message}
          {...register('username')}
        />
        <Input label="E-mail" type="email" error={errors.email?.message} {...register('email')} />
        <Input
          label="Senha"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
        {loading ? <Button disabled>Cadastrando...</Button> : <Button>Cadastrar</Button>}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
