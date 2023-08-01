import React, {useContext} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts} from '../../assets';
import {ButtonCustom} from '../../components';
import {GlobalContext} from '../../Store/globalContext';
import {StatusBar} from 'react-native';

const Setting = ({navigation, route}) => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;

  const _setDarkTheme = () => {
    if (dark == true) {
      return false;
    }
    globalContext.dispatch({type: 'TOGGLE_IS_DARK'});
  };

  const _setLightTheme = () => {
    if (dark == false) {
      return false;
    }
    globalContext.dispatch({type: 'TOGGLE_IS_DARK'});
  };

  console.log(globalContext.state);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={dark ? colors.black : colors.green}
      />
      <View
        style={[
          styles.body,
          {
            backgroundColor: dark ? colors.black : colors.green,
          },
        ]}>
        <ButtonCustom title="Dark Theme" onPress={_setDarkTheme} />
        <ButtonCustom
          title="Light Theme"
          color={colors.black}
          style={{marginTop: dimens.m}}
          onPress={_setLightTheme}
          buttonStyle={{marginTop: dimens.l}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray,
  },
  text: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: dimens.xxl,
    color: colors.black,
  },
});

export default Setting;
