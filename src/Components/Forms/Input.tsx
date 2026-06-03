import React from 'react';

import styles from './Input.module.css';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> & {
    label: string;
    type: React.HTMLInputTypeAttribute;
    name: string;
    error?: string | null;
};

const Input = ({
    label, 
    type, 
    name,
    error,
    ...props
    }: InputProps) => {
    const errorId = `${name}-error`;

    return (
        <div className={styles.wrapper}>
            <label htmlFor={name} className={styles.label} >{label}</label>
            <input 
                id={name} 
                name={name} 
                className={styles.input} 
                type={type}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                {...props}
            />
            {error && (
                <p className={styles.error} id={errorId} role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}

export default Input
