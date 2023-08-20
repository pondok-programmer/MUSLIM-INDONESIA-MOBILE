import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, images} from '../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation, route}) => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const checkForToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        return !!token;
      } catch (error) {
        console.error('Error reading token from AsyncStorage:', error);
        return false;
      }
    };

    const timeout = setTimeout(async () => {
      const tokenExists = await checkForToken();
      setHasToken(tokenExists);

      if (tokenExists) {
        navigation.replace('MainNavigator');
        console.log('Successful save Token');
        ToastAndroid.show('Selamat datang ', ToastAndroid.SHORT);
      } else {
        navigation.replace('Login');
        console.log(' Nothing Token');
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.green} />
      <View style={styles.body}>
        <Image source={images.logoMuslimIndo} style={styles.logo} />
        <View style={styles.bodyTitle}>
          <Text style={[styles.text, {marginTop: dimens.xxl}]}>Muslim</Text>
          <Text style={styles.textIndonesia}> Indonesia</Text>
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
    height: hp('100%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: hp('20%'),
    width: wp('40%'),
    borderRadius: 95,
  },
  bodyTitle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: fonts.PoppinsBold,
    fontSize: dimens.xxl,
    color: colors.white,
    bottom: 10,
  },
  textIndonesia: {
    fontFamily: fonts.PoppinsBold,
    fontSize: dimens.xxl,
    color: colors.yellow,
  },
});

export default Splash;
