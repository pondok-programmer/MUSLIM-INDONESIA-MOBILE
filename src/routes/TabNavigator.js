import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {GlobalContext} from '../Store/globalContext';
import {Masjid, Restoran, Tpq} from '../screens';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  const globalContext = React.useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Masjid" component={Masjid} />
        <Tab.Screen name="Restoran" component={Restoran} />
        <Tab.Screen name="Tpq" component={Tpq} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
