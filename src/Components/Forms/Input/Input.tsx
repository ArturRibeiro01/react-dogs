import React from 'react';

import { Field, FieldError, Label, Wrapper } from './Input.styles';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> & {
  label: string;
  type: React.HTMLInputTypeAttribute;
  name: string;
  error?: string | null;
};

const Input = ({ label, type, name, error, ...props }: InputProps) => {
  const errorId = `${name}-error`;

  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <Field
        id={name}
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <FieldError id={errorId} role="alert">
          {error}
        </FieldError>
      )}
    </Wrapper>
  );
};

export default Input;
