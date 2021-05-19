import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/usersSlice';

export default function Users() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (data.users.length === 0) {
    return <div>Нет данных</div>;
  }

  return (
    <div style={{border: "1px solid #ccc", padding:'20px', marginBottom:'20px'}}>
        <h3>Users async fetch</h3>
      {data.users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </div>
  );
}
