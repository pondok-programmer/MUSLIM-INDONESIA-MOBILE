import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash } from '../screens';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions = {{
				headerShown : false,
				}}>
				<Stack.Screen name = "Splash" component = {Splash} />
				<Stack.Screen name = "MainNavigator" component = {MainNavigator} />
			</Stack.Navigator>
		</NavigationContainer>
  );
}

export default AppNavigator;
