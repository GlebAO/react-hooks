import React, { useState, useMemo, useEffect, useCallback } from 'react';

import ItemsList from './ItemsList';
import { useLogger } from '../utils/customHooks';

function computeInitialCounter() {
  console.log('some calculations');
  return Math.trunc(Math.random() * 20);
}

function complexCompute(num) {
  console.log('complexCompute');
  let i = 0;
  while (i < 1000000000) i++;
  return num * 2;
}

export default function Counter() {
  // В useState передаем функцию
  // const [value, setValue] = useState(computeInitialCounter()) - вызывается при каждом рендере
  //Если передать в useState функцию, то вызовется она только один раз при первом рендере
  const [value, setValue] = useState(() => {
    return computeInitialCounter();
  });
  const [color, setColor] = useState('green');

  useLogger(value);

  //Объект, как начальное состояние
  const [state, setState] = useState({
    title: 'Счетчик',
    date: Date.now(),
  });

  //рендер происходит с задержкой потому что происходит выполнение сложной функции
  //вычисления зависят только от value, но не от color и state
  //без memo при каждом рендере будут выполняться сложные выисления
  // memo с зависимостями дает понять, что выисления надо делать заново только
  //при изменении входных данных value
  // в useMemo передаем колбэк который должен вернуть вычисления
  const computed = useMemo(() => {
    return complexCompute(value);
  }, [value]);

  function inc() {
    setValue((prevState) => {
      return prevState + 1;
    });
  }

  function dec() {
    setValue((prevState) => {
      return prevState - 1;
    });
  }

  // если в state объект, то для изменения одного поля объекта
  // необходимо в setState передать функцию, чтобы взять prevState
  // деструктурировать в новый объект и там заменить необходимое поле
  function updateTitle() {
    setState((prev) => {
      return {
        ...prev,
        title: 'Новое значение',
      };
    });
  }

  //при каждом рендере содается новый объект, если нет мемо
  const styles = useMemo(
    () => ({
      color,
    }),
    [color],
  );
  //если мы к примеру запускаем setValue или setState
  //то эффект этот все равно срабатывает, хотя в зависимостях styles
  //в зависимости каждый раз попадает новый объект
  useEffect(() => {
    console.log('styles changed');
  }, [styles]);

  //Функцию оборачиваем в useCallback чтобы при рендере компонента не происходило ее
  // создание и не вызывался ререндер, где эта функция в зависимостях useEffect
  // useCallback оборачивает не результат, как мемо, а саму функцию.
  const generateItemsFromAPI = useCallback(
    //функция
    (startIndex) => {
      return new Array(value)
        .fill('')
        .map((_, i) => `Элемент ${i + startIndex}`);
    },
    //конец функции
    [value],
  );

  return (
    <div style={{ padding: 10, border: '1px solid #ccc', marginBottom: 20 }}>
      <h1>Счетчик: {value}</h1>
      <h2 style={styles}>Сложное вычисление: {computed}</h2>
      <button type='button' onClick={inc}>
        Inc
      </button>
      <button type='button' onClick={dec}>
        Dec
      </button>
      <button type='button' onClick={updateTitle}>
        Change title
      </button>
      <button
        type='button'
        onClick={() => setColor(color === 'green' ? 'red' : 'green')}
      >
        Change color of subtitle
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      {/*Передаем в дочерний элемент функцию. 
      Если поменять стейт в Counter функция как и объект создается заново
      новая функция передается в ItemsList. Там useEffect видит, что зависимость поменялась
      и заново запрашивает элементы
      */}
      <ItemsList getItems={generateItemsFromAPI} />
    </div>
  );
}
