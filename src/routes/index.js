import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Admin,
  DataAllSearch,
  EditProfile,
  ForgotPassword,
  Login,
  NewPassword,
  Register,
  Splash,
} from '../screens';
import MainNavigator from './MainNavigator';
import {
  ProfileAdmin,
  UploadBeritaKajian,
  UploadCreateAdmin,
  UploadKajian,
} from '../screens/Admin';

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
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="DataSearch" component={DataAllSearch} />
        <Stack.Screen name="Upload Masjid" component={UploadCreateAdmin} />
        <Stack.Screen
          name="Upload Berita kajian"
          component={UploadBeritaKajian}
        />
        <Stack.Screen name="Upload Kajian" component={UploadKajian} />
        <Stack.Screen name="Profile Admin" component={ProfileAdmin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
