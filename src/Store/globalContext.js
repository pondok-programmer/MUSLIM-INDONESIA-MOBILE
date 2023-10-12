import React, {useReducer, createContext} from 'react';

const initialValue = {
  isDark: false,
  user: {
    photo: '',
    full_name: '',
  },
};

const globalTypes = {
  TOGGLE_IS_DARK: 'TOGGLE_IS_DARK',
  SET_THEME: 'SET_THEME',
  SET_USER: 'SET_USER',
};
export {globalTypes};

const reducer = (state, action) => {
  switch (action.type) {
    case globalTypes.TOGGLE_IS_DARK:
      return {isDark: !state.isDark};
    case globalTypes.SET_THEME:
      return {isDark: action.payload};
    case globalTypes.SET_USER:
      return {...state, user: {...state.user, ...state.payload}};
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialValue);

export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  console.log('ini state', state);

  const updateUser = userData => {
    dispatch({type: globalTypes.SET_USER, payload: userData});
  };

  return (
    <GlobalContext.Provider value={{state, dispatch, updateUser}}>
      {children}
    </GlobalContext.Provider>
  );
};
