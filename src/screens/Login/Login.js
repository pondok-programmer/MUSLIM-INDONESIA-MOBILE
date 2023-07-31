import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, icons, images} from '../../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Fumi} from 'react-native-textinput-effects';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {GlobalContext} from '../../Store/globalContext';

const Login = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const globalContext = useState(GlobalContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.green1} />
      <View style={styles.ViewContainer}>
        <Image source={images.Masjid} style={styles.Masjid} />
        <View style={styles.bodyText}>
          <Text style={styles.textMasjid}>Muslim </Text>
          <Text style={styles.textIndo}>Indonesia</Text>
        </View>
      </View>
      <View style={styles.navbarLogin}>
        <Text style={styles.login1}>Welcome </Text>
        <Text style={styles.login2}>To login! </Text>
      </View>
      <View style={styles.bodyFumi}>
        <Fumi
          label={'Email'}
          iconClass={Icon}
          iconName={'account-box-multiple-outline'}
          iconColor={'#54B435'}
          iconSize={25}
          iconWidth={40}
          inputPadding={16}
          style={styles.fumiEmail}
          color={colors.black}
        />
        <Fumi
          label={'Password'}
          iconClass={Icon}
          iconName={'lock-outline'}
          iconColor={'#54B435'}
          iconSize={25}
          iconWidth={40}
          inputPadding={16}
          secureTextEntry={secureTextEntry}
          style={styles.fumiPassword}
          color={colors.black}
        />
        <View style={styles.bodyEye}>
          <TouchableOpacity onPress={() => setSecureTextEntry(val => !val)}>
            <Image source={icons.eye} style={styles.eye} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.headerForgotPassword}>
        <Text style={styles.txtForgot}>Forgot </Text>
        <Text style={styles.txtPassword}>Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <LinearGradient colors={['#40EC15', '#688F16']} style={styles.login}>
          <Text style={styles.txtLogin}>Let's Login</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.bodyConnect}>
        <Text style={styles.txtConnect}>Connect With</Text>
        <TouchableOpacity>
          <Image source={icons.GoggleIndo} style={styles.Goggle} />
        </TouchableOpacity>
      </View>
      <View style={styles.createAccount}>
        <Text style={styles.txtQuestions}>Don't have an account</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.txtCreateAccount}>Create account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green1,
  },
  ViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  Masjid: {
    height: hp('25%'),
    width: wp('60%'),
  },
  bodyText: {
    flexDirection: 'row',
    marginTop: 3,
  },
  textMasjid: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: dimens.xxxl,
    color: colors.yellow,
  },
  textIndo: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: dimens.xxxl,
    color: colors.white,
  },
  navbarLogin: {
    marginHorizontal: 20,
    flexDirection: 'row',
    marginTop: '10%',
    top: '3.5%',
  },
  login1: {
    color: colors.white,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: dimens.xxl,
  },
  login2: {
    color: colors.yellow,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: dimens.xxl,
  },
  bodyFumi: {
    marginTop: '3%',
  },
  fumiEmail: {
    marginHorizontal: 20,
    borderRadius: 10,
  },
  fumiPassword: {
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: '2%',
  },
  bodyEye: {
    marginBottom: 10,
  },
  eye: {
    marginLeft: 350,
    bottom: 43,
  },
  headerForgotPassword: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 30,
    bottom: 34,
  },
  txtForgot: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: dimens.x,
    color: colors.white,
  },
  txtPassword: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: dimens.x,
    color: colors.yellow,
  },
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 95,
    borderRadius: 100,
    height: hp('8%'),
    width: wp('56%'),
  },
  txtLogin: {
    fontFamily: fonts.PoppinsBold,
    color: colors.white,
    fontSize: dimens.xxl,
  },
  bodyConnect: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '4%',
  },
  txtConnect: {
    fontSize: dimens.m,
    fontFamily: fonts.PoppinsBold,
    color: colors.white,
  },
  Goggle: {
    width: wp('10%'),
    height: hp('5%'),
  },
  createAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '6%',
  },
  txtQuestions: {
    color: colors.black,
    fontFamily: fonts.PoppinsRegular,
  },
  txtCreateAccount: {
    color: colors.white,
    fontFamily: fonts.PoppinsBold,
    fontSize: dimens.m,
  },
  line: {
    width: wp('40%'),
    borderWidth: 3,
    color: colors.black,
    marginTop: '7%',
    marginLeft: 128,
    borderRadius: 20,
  },
});
