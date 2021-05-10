import React, { useEffect, useState, useRef } from 'react';

export default function TypeSwitcher() {
  const [type, setType] = useState('users');
  const [data, setData] = useState([]);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  //const [renderCount, setRenderCount] = useState(1);

  //useRef сохраняет состояние, которое сохраняется между рендерами
  //козда мы меняем значение рефа, то не вызываем рендер компонента
  // если надо сохранить что то между рендерами и не перерисовывать компонет
  const renderCount = useRef(1);

  //способ получения значения предыдущего состояния
  const prevPos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    //console.log('Эффект по смене позиции мышки запустился');
    prevPos.current = pos;
  }, [pos]);

  //Эффект без зависимостей запускется при каждом рендере
  // В нем меняется состояние (setRenderCount), что приводит новому рендеру и т.д.
  useEffect(() => {
    //console.log('Эффект по увеличению каунтера рендеров запустился');
    //setRenderCount(prev => prev + 1); // Вызывает зацикливание потму что меняем состояние
    renderCount.current++;
  });

  //1.Эффект без зависимостей запускается при каждом рендере
  useEffect(() => {
    //console.log('rendered TypeSwitcher in All renders');
  });

  //2.Эффект запускается только, когда меняется type
  // при изменении стейта запускается размонтирование и очистка
  // как только мы тайп поменяли запускается функция
  useEffect(() => {
    console.log('rendered TypeSwitcher dependent on TYPE', type);
    setTimeout(() => {
      fetch(`https://jsonplaceholder.typicode.com/${type}`)
        .then((response) => response.json())
        .then((json) => setData(json)); //Изменяется состояние и запускается рендер
    }, 1000);

    return () => {
      console.log('TypeSwitcher: clean type', type); // Предыдущий type
    };
  }, [type]);

  //3. Эффект запускается только при первом рендере
  useEffect(() => {
    console.log('TypeSwitcher ComponentDidMount');
  }, []);

  const mouseMoveHandler = (event) => {
    setPos({
      x: event.clientX,
      y: event.clientY,
    });
  };

  //4. При размонтировании компонента делаем очистку листенера
  useEffect(() => {
    console.log('Typeswitcher mousemove effect fired');
    window.addEventListener('mousemove', mouseMoveHandler);
    //возвращаем функцию
    return () => {
      console.log('removeListener');
      window.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  return (
    <div>
      <h3>Количество рендеров: {renderCount.current}</h3>
      <h3>Ресурс: {type}</h3>
      <button type='button' onClick={() => setType('users')}>
        Users
      </button>
      <button type='button' onClick={() => setType('todos')}>
        Todo
      </button>
      <button type='button' onClick={() => setType('posts')}>
        Posts
      </button>
      <div>
        current
        <pre>{JSON.stringify(pos, null, 2)}</pre>
      </div>
      <div>
        prev
        <pre>{JSON.stringify(prevPos.current, null, 2)}</pre>
      </div>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
