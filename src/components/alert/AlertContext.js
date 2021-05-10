import React, { useContext, useReducer } from 'react';

const AlertContext = React.createContext();
const AlertToggleContext = React.createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

//Вариант когда создаем несколько провайдеров для каждой переменной
export const useAlertToggle = () => {
  return useContext(AlertToggleContext);
};

const SHOW_ALERT = 'SHOW_ALERT';
const HIDE_ALERT = 'HIDE_ALERT';

const initialState = {
  opened: false,
  message: '',
};

//reducer - это pure function
const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      const { message } = action.payload;
      return {
        ...state,
        opened: true,
        message,
      };
    case HIDE_ALERT:
      return {
        ...state,
        opened: false,
        message: '',
      };
    default:
      return state;
  }
};

export function AlertProvider({ children }) {
  //const [opened, setOpened] = useState(true);
  //const toggle = () => setOpened((prev) => !prev);

  //В useReducer передаем функцию редюсер и начальное состояние
  const [state, dispatch] = useReducer(reducer, initialState);

  const show = (message) => {
    dispatch({ type: SHOW_ALERT, payload: { message } });
    setTimeout(hide, 1000);
  };

  const hide = () => dispatch({ type: HIDE_ALERT });

  return (
    <AlertContext.Provider
      value={{
        alertState: state,
        show,
        hide,
      }}
    >
      {/*<AlertToggleContext.Provider value={toggle}>*/}
      {children}
      {/*</AlertToggleContext.Provider>*/}
    </AlertContext.Provider>
  );
}
