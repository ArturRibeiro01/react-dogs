import React from 'react';

import { Message, type StatusMessageVariant } from './StatusMessage.styles';

type StatusMessageProps = {
  children: React.ReactNode;
  variant?: StatusMessageVariant;
};

const StatusMessage = ({ children, variant = 'info' }: StatusMessageProps) => {
  const role = variant === 'error' ? 'alert' : 'status';

  return (
    <Message $variant={variant} role={role}>
      {children}
    </Message>
  );
};

export default StatusMessage;
