import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, icons, images} from '../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

const ForgotPassword = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.green} />

      <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
        <Image source={icons.left} style={styles.iconLeft} />
      </TouchableOpacity>

      {/* IMAGES FORGOT PASSWORD */}
      <View style={styles.contentImg}>
        <Image source={images.ForgotPassword} style={styles.imgForget} />
      </View>

      {/* COLLECTION OF TEXT */}
      <View style={styles.bodyTextForgetPassword}>
        <Text style={styles.txtForgot}>Forgot</Text>
        <View style={styles.viewBodyTextPassword}>
          <Text style={styles.txtForgot}>Pass</Text>
          <Text style={styles.txtPassword}>word?</Text>
        </View>
      </View>
      <View style={styles.contentDescription}>
        <Text style={styles.txtDescription}>
          Don't worry! It happens. Please enter your Email, we will send you an
          OTP in your Email account.
        </Text>
      </View>

      {/* TEXTINPUT */}
      <LinearGradient
        colors={['#AEAEAE', '#AEAEAE']}
        style={styles.contentEmail}>
        <TextInput
          placeholder="Put your email"
          style={styles.textInput}
          placeholderTextColor={colors.lightBlack}
        />
      </LinearGradient>

      {/* LOGIN */}
      <TouchableOpacity onPress={() => navigation.replace('NewPassword')}>
        <LinearGradient colors={['#40EC15', '#688F16']} style={styles.reset}>
          <Text style={styles.txtRiset}>Let's Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* LINE */}
      <View style={styles.line} />
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
  },
  icon: {
    marginLeft: 10,
  },
  iconLeft: {
    height: hp('5%'),
    width: wp('10%'),
  },
  contentImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgForget: {
    height: hp('34%'),
    width: wp('66%'),
  },
  bodyTextForgetPassword: {
    marginLeft: '8%',
  },
  viewBodyTextPassword: {
    flexDirection: 'row',
    bottom: 10,
  },
  txtForgot: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: dimens.xxxl,
    color: colors.white,
  },
  txtPassword: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: dimens.xxxl,
    color: colors.yellow,
  },
  contentDescription: {
    marginHorizontal: 33,
  },
  txtDescription: {
    textAlign: 'auto',
    bottom: 18,
    color: colors.white,
  },
  contentEmail: {
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    marginHorizontal: 30,
    height: hp('8%'),
    borderRadius: 10,
    elevation: 5,
  },
  textInput: {
    marginLeft: 10,
    color: colors.black,
    // fontFamily: fonts.PoppinsMedium,
  },
  reset: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 10,
    height: hp('8%'),
    width: wp('86%'),
    marginTop: '20%',
  },
  txtRiset: {
    fontSize: dimens.xl,
    fontFamily: fonts.PoppinsBold,
    color: colors.white,
  },
  line: {
    width: wp('40%'),
    borderWidth: 3,
    color: colors.black,
    marginTop: '27%',
    marginLeft: 128,
    borderRadius: 20,
  },
});
