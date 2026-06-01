import React from 'react';
import { Link } from 'react-router-dom';
import { passwordApi } from '../../api';
import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../Helper/Error';
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
      setSuccess('Email enviado. Verifique sua caixa de entrada.');
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Perdeu a senha?</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Email / Usuário"
          type="text"
          name="login"
          {...login}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar Email</Button>
        )}
        <Error error={error} />
        {success && <p className={styles.success}>{success}</p>}
      </form>
      <Link className={styles.perdeu} to="/login">
        Voltar para login
      </Link>
    </section>
  );
};

export default LoginPasswordLost;
