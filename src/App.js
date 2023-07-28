import React from 'react';
import AppNavigator from './routes';
import AppContextProvider from './Store';

// running app.js
const App = () => {
	return (
		<AppContextProvider>
			<AppNavigator />
		</AppContextProvider>
	);
};

export default App;
