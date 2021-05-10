import React from 'react';

import { useAlert } from './alert/AlertContext';

export default function Main() {
  const { show } = useAlert();
  return (
    <div
      style={{ border: '1px solid #000000', padding: '10', marginBottom: 20 }}
    >
      <h1>Привет в примере с Context</h1>
      <button onClick={() => show('Будь внимателен!')} className='btn btn-success'>
        Показать alert
      </button>
    </div>
  );
}
