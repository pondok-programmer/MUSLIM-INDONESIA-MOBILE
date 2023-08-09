import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Masjid} from '../Masjid';
import {Restoran} from '../Restoran';
import {Tpq} from '../Tpq';
import {colors} from '../../utils';
import {GlobalContext} from '../../Store/globalContext';
import {useNavigation} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
  const globalContext = React.useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Masjid"
        activeColor={colors.white}
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
        <Tab.Screen name={'Masjid'} component={Masjid} />
        <Tab.Screen name={'Restoran'} component={Restoran} />
        <Tab.Screen name={'Tpq'} component={Tpq} />
      </Tab.Navigator>
    </View>
  );
};

export default TopTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barStyle: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});
