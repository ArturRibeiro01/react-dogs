import React from 'react'

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

const useForm = (type) => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(null);

    function validate(value){
        if(type === false) return true;
        if(value.lenght < 1){
            setError('Preencha um valor.');
            return false;
        }else if(types[type] && !types[type].regex.test(value)) {
            setError(types[type].message);
            return false;
        }else{
            setError(null);
            return true;
        }
    }

    function onChange({target}){
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
