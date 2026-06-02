import React from 'react';

type FormType = keyof typeof types | false | '';

const types = {
    email:{
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message:'Preencha um e-mail valido',
    },
    password:{
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        message:'A senha precisa conter no mínimo 8 caracteres, com 1 caractere maiúsculo,1 caractere minúsculo e um dígito. ',
    },
    number:{
        regex:/^\d+$/,
        message:'Utilize apenas números'
    }
}

const useForm = (type?: FormType) => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);

    function validate(value: string){
        if(type === false) return true;
        const fieldValue = String(value ?? '').trim();

        if(fieldValue.length < 1){
            setError('Preencha um valor.');
            return false;
        }else if(type && type in types && !types[type].regex.test(fieldValue)) {
            setError(types[type].message);
            return false;
        }else{
            setError(null);
            return true;
        }
    }

    function onChange({target}: React.ChangeEvent<HTMLInputElement>){
        if(error) validate(target.value);
        setValue(target.value);
    }

    return {
        value,
        setValue,
        onChange,
        error,
        validate: () => validate(value),
        onBlur: () => validate(value),
    };

}

export default useForm
