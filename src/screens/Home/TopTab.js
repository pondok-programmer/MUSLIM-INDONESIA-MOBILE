import {StyleSheet, View, TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Masjid} from '../Masjid';
import {Restoran} from '../Restoran';
import {Tpq} from '../Tpq';
import {colors, dimens} from '../../utils';
import {GlobalContext} from '../../Store/globalContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fonts} from '../../assets';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: colors.green,
              marginHorizontal: 10,
              height: hp('4%'),
              width: wp('9%'),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Animated.Text
              style={{
                fontFamily: fonts.PoppinsMedium,
                color: colors.white,
                fontSize: dimens.l,
              }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TopTab = () => {
  const globalContext = React.useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  return (
    <Tab.Navigator
      initialRouteName="Masjid"
      activeColor={colors.white}
      inactiveColor="#95a5a6"
      shifting={false}
      tabBar={props => <MyTabBar {...props} />}
      style={{backgroundColor: dark ? colors.black : colors.white}}>
      <Tab.Screen name={'Masjid'} component={Masjid} />
      <Tab.Screen name={'Restoran'} component={Restoran} />
      <Tab.Screen name={'Tpq'} component={Tpq} />
    </Tab.Navigator>
  );
};

export default TopTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // barStyle: {
  //   position: 'absolute',
  //   bottom: 16,
  //   right: 16,
  //   left: 16,
  //   borderRadius: 10,
  //   borderTopRightRadius: 30,
  //   borderTopLeftRadius: 30,
  // },
});
