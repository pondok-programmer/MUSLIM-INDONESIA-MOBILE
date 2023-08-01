import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForgotPassword, Login, NewPassword, Register, Splash} from '../screens';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
