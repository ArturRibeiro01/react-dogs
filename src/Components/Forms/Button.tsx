import React from 'react'
import styles from './Button.module.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

const Button = ({children, ...props}: ButtonProps) => {
    return (
    <button {...props} className={styles.button}>{children}</button>
    )
}

export default Button
