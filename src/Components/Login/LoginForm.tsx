import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { loginSchema, type LoginFormData } from '@/schemas/forms';
import { useAuthStore } from '@/stores/authStore';
import Button from '@components/Forms/Button';
import stylesBtn from '@components/Forms/Button.module.css';
import Input from '@components/Forms/Input';
import Error from '@components/Helper/Error';

import styles from './LoginForm.module.css';

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
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
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
                {loading ? (
                    <Button disabled>Carregando...</Button>
                ) : (
                    <Button>Entrar</Button>
                )}
                <Error error={error} />
            </form>
            <Link className={styles.perdeu} to="/login/perdeu">
                Perdeu a senha?
            </Link>
            <div className={styles.cadastro}>
                <h2 className={styles.subtitle}>Cadastre-se</h2>
                <p>Ainda não possui conta? Cadastre-se no site.</p>
                <Link className={stylesBtn.button} to="/login/criar">
                    Cadastro
                </Link>
            </div>
        </section>
    );
};

export default LoginForm;
