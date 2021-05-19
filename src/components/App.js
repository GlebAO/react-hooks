import React from 'react';
import { Provider } from 'react-redux'

import CreateForm from './CreateForm';
import Counter from './Counter';
import Users from './Users'
import Post from "./Post"
import { ReduxCounter } from './ReduxCounter';
import TypeSwitcher from './TypeSwitcher';
import Main from './Main';
import Alert from './alert/Alert';
import { AlertProvider } from './alert/AlertContext'
import store from '../redux/store'

export default function App() {
  return (
      <Provider store={store}>
      <AlertProvider>
        <Post />
        <Users />
        <ReduxCounter />
        <Alert />
        <Main />
        <CreateForm />
        <Counter />
        <TypeSwitcher />
      </AlertProvider>
      </Provider>
  );
}
