import React from 'react';

import { userApi } from '@/api';
import { UserContext } from '@/UserContext';
import Button from '@components/Forms/Button';
import Input from '@components/Forms/Input';
import Error from '@components/Helper/Error';
import useFetch from '@hooks/useFetch';
import useForm from '@hooks/useForm';

const LoginCreate = () => {
    const username = useForm();
    const email = useForm('email');
    const password = useForm('password');

    const {userLogin} = React.useContext(UserContext);
    const {loading, error, request} = useFetch();


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(!username.validate() || !email.validate() || !password.validate()) return;

        const {response} = await request(() => userApi.create({
            username: username.value,
            email: email.value,
            password: password.value
        }));
        if(response && response.ok) userLogin(username.value, password.value);
    }

    return (
        <section className='animeLeft'>
            <h1 className="title">Cadastre-se</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Usuário" type="text" name="username"{...username} />
                <Input label="E-mail" type="email" name="email"{...email} />
                <Input label="Senha" type="password" name="password"{...password} />
                {loading ? (
                    <Button disabled>Cadastrando...</Button>
                ) : (
                    <Button>Cadastrar</Button>
                )}
                <Error error={error}/>
            </form>
        </section>
    )
}

export default LoginCreate
