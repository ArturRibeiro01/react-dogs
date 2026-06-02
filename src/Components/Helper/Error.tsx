import React from 'react'
import StatusMessage from './StatusMessage';

type ErrorProps = {
    error: string | null;
};

const Error = ({error}: ErrorProps) => {

    if(!error) return null;


    return <StatusMessage variant="error">{error}</StatusMessage>;
}

export default Error;
