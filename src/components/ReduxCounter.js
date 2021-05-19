import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
} from '../redux/reduxCounterSlice';

export function ReduxCounter() {
  const count = useSelector((state) => state.reduxCounter.value);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleChange = () => {
    const amount = +inputRef.current.value
    dispatch(incrementByAmount(amount));
    inputRef.current.value = '';
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        marginBottom: '20px',
      }}
    >
      <h3>Redux toolkit</h3>
      <div>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <div>
        <input ref={inputRef} defaultValue='' />
        <button type='button' onClick={handleChange}>
          inc by value
        </button>
      </div>
    </div>
  );
}
