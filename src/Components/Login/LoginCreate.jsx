import React from 'react'
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import useForm from '../../Hooks/useForm'
import { userApi } from '../../api';
import {UserContext} from '../../UserContext'
import useFetch from '../../Hooks/useFetch';

const LoginCreate = () => {
    const username = useForm();
    const email = useForm('email');
    const password = useForm();

    const {userLogin} = React.useContext(UserContext);
    const {loading, error, request} = useFetch();


    async function handleSubmit(event){
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
                <Input label="Email" type="email" name="email"{...email} />
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
