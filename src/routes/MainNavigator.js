import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Home, Kajian, Setting} from '../screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../utils';
import {GlobalContext} from '../Store/globalContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => {
  const globalContext = React.useContext(GlobalContext);
  const dark = globalContext.state.isDark;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colors.primary}
      inactiveColor="#95a5a6"
      shifting={false}
      barStyle={[
        styles.barStyle,
        {
          backgroundColor: dark ? colors.black : colors.white,
          borderTopWidth: dark ? 0.3 : 0,
          borderRightWidth: dark ? 0.3 : 0,
          borderLeftWidth: dark ? 0.3 : 0,
          borderColor: colors.white,
        },
      ]}
      style={{backgroundColor: dark ? colors.black : colors.white}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Kajian"
        component={Kajian}
        options={{
          tabBarLabel: 'Kajian',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="play-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Setting}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 8,
    justifyContent: 'center',
    height: hp('8%'),
    borderColor: colors.lightGray,
    width: wp('100%'),
    // position: 'absolute', //use if you want to absolute navbar
  },
});
export default MainNavigator;
