import React from 'react';
import { useAlert } from './AlertContext';

export default function Alert() {
  const {
    alertState: { opened, message },
    hide,
  } = useAlert();

  if (!opened) {
    return null;
  }

  return (
    <div
      style={{
        background: 'red',
        color: 'white',
        padding: 10,
        marginBottom: 10,
      }}
      onClick={hide}
    >
      <p>{message}</p>
    </div>
  );
}
