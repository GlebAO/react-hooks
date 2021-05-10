import React from 'react';

import CreateForm from './CreateForm';
import Counter from './Counter';
import TypeSwitcher from './TypeSwitcher';
import Main from './Main';
import Alert from './alert/Alert';
import { AlertProvider } from './alert/AlertContext'

export default function App() {
  return (
    <div>
      APP
      <AlertProvider>
        <Alert />
        <Main />
        <CreateForm />
        <Counter />
        <TypeSwitcher />
      </AlertProvider>
    </div>
  );
}
