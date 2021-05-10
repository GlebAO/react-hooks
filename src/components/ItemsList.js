import React, { useState, useEffect } from 'react';

export default function ItemsList({ getItems }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('ItemsList getItems effect starts');
    setTimeout(() => {
      const newItems = getItems(34);
      setItems(newItems);
    }, 3000);
  }, [getItems]);

  if(!items.length) {
      return 'Загрузка элементов'
  }

  return (
    <div style={{ border: '1px solid yellow', padding: 10 }}>
      <h4>ItemsList - Children component for Counter</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
