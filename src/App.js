import React from 'react';
import AppNavigator from './routes';
import AppContextProvider from './Store';

//  test running app.js
const App = () => {
  return (
    <AppContextProvider>
      <AppNavigator />
    </AppContextProvider>
  );
};

export default App;
