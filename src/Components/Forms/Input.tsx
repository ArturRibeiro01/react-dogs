import React from 'react';

import styles from './Input.module.css';

type InputProps = {
    label: string;
    type: React.HTMLInputTypeAttribute;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    error: string | null;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
};

const Input = ({
    label, 
    type, 
    name,
    value,
    onChange,
    error,
    onBlur,
    }: InputProps) => {
    return (
        <div className={styles.wrapper}>
            <label htmlFor={name} className={styles.label} >{label}</label>
            <input 
                id={name} 
                name={name} 
                className={styles.input} 
                type={type} 
                value={value} 
                onChange={onChange}
                onBlur={onBlur}
            />
            {error && <p className={styles.error}>{error}</p>}
        </div>
    )
}

export default Input
