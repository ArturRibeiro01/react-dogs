import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { passwordApi } from '../../api';
import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../Helper/Error';
import StatusMessage from '../Helper/StatusMessage';
import styles from './LoginForm.module.css';

const LoginPasswordReset = () => {
  const password = useForm('password');
  const { error, loading, request } = useFetch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [success, setSuccess] = React.useState<string | null>(null);

  const key = searchParams.get('key');
  const login = searchParams.get('login');
  const invalidUrl = !key || !login;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(null);

    if (invalidUrl || !password.validate()) return;

    const { response } = await request(() =>
      passwordApi.reset({
        login,
        key,
        password: password.value,
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
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              label="Nova senha"
              type="password"
              name="password"
              {...password}
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
