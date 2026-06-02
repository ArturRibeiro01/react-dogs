import React from 'react';
import styles from './StatusMessage.module.css';

type StatusMessageVariant = 'error' | 'success' | 'info';

type StatusMessageProps = {
    children: React.ReactNode;
    variant?: StatusMessageVariant;
};

const StatusMessage = ({children, variant = 'info'}: StatusMessageProps) => {
    const role = variant === 'error' ? 'alert' : 'status';

    return (
        <p className={`${styles.message} ${styles[variant]}`} role={role}>
            {children}
        </p>
    );
};

export default StatusMessage;
