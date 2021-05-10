import React, { useState } from 'react';

import { useInput } from '../utils/customHooks';

export default function CreateForm() {
  const [name, setName] = useState('');

  //кастомный хук!
  const input = useInput('')

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <div>
      <h3>Name: {name}</h3>
      <input value={name} onChange={handleChange} />
      <hr />
      <h3>useInput: {input.value}</h3>
      <input type="text" {...input.bind} />
      <button className="btn btn-warning" onClick={() => input.clear()}>Очистить</button>
      <hr />
    </div>
  );
}
