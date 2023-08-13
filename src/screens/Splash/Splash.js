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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
