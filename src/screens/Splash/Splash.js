import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, images} from '../../assets';

const Splash = ({navigation, route}) => {
  useEffect(() => {
    const wait = ms => {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    };
    let mounted = true;
    if (mounted) {
      wait(3000).then(() => {
        navigation.replace('Login');
      });
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.green} />
      <View style={styles.body}>
        <Image source={images.Masjid} style={styles.logo} />
        <View>
          <Text style={[styles.text, {marginTop: dimens.xxl}]}>Muslim</Text>
          <Text style={styles.textIndonesia}>Indonesia</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
  },
  body: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    tintColor: colors.white,
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: dimens.xxl,
    color: colors.white,
  },
  textIndonesia: {
    fontFamily: fonts.PoppinsBold,
    fontSize: dimens.xxl,
    color: colors.yellow,
    bottom: 10,
  },
});

export default Splash;
