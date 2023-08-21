import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Dimensions,
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
import {postLogin} from '../../services/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Login = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const globalContext = useState(GlobalContext);

  // ! GET DATA API LOGIN
  const getData = async () => {
    try {
      // ! Validasi Email
      if (!email) {
        Alert.alert('Perhatian!', 'Email harus diisi');
        return;
      }

      if (!email.endsWith('@gmail.com')) {
        Alert.alert('Invalid Email', 'Please enter a valid email address');
        return;
      }

      // ! Validasi Password
      if (!password) {
        Alert.alert('Perhatian!', 'Password harus diisi');
        return;
      }

      if (password.lenght < 8) {
        Alert.alert('Invalid Password', 'Password minimal  8 karakter');
        return;
      }

      const result = await postLogin({email, password, navigation});
      console.log('result...', result);

      if (result && result.token) {
        await AsyncStorage.setItem('token', result.token);
        console.log('Token saved successfully');
        navigation.replace('MainNavigator');
        ToastAndroid.show('Selamat Datang', ToastAndroid.SHORT);
      } else if (
        result &&
        result.message === 'Email or password is incorrect.'
      ) {
        Alert.alert(
          'Login Failed',
          'Email or password is incorrect. Please check your credentials.',
        );
      } else {
        console.log('Login failed or no token received.');
      }
    } catch (error) {
      console.log('Error during login:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const nothingPassword = () => {
    Alert.alert('Perhatian !', ' Apakah anda lupa password ', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => navigation.navigate('ForgotPassword'),
      },
    ]);
  };

  // ! SecureTextEntry
  const togglesecureTextEntry = () => {
    setSecureTextEntry(praveState => !praveState);
  };

  // ! Image eye
  const eyeIcon = secureTextEntry ? icons.show : icons.eye;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.green} />

      {/* NAVBAR iMAGES */}
      <View style={styles.ViewContainer}>
        <Image source={images.BgLogo} style={styles.Masjid} />
        {/* <View style={styles.bodyText}>
          <Text style={styles.textMasjid}>Muslim </Text>
          <Text style={styles.textIndo}>Indonesia</Text>
        </View> */}
      </View>
      <View style={styles.navbarLogin}>
        <Text style={styles.login1}>Welcome </Text>
        <Text style={styles.login2}>To login! </Text>
      </View>
      <View style={styles.bodyFumi}>
        {/* TEXTINPUT */}
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
          onChangeText={val => setEmail(val)}
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
          onChangeText={val => setPassword(val)}
        />
        <View style={styles.bodyEye}>
          <TouchableOpacity onPress={togglesecureTextEntry}>
            <Image source={eyeIcon} style={styles.eye} />
          </TouchableOpacity>
        </View>
      </View>

      {/* FORGOT PASSWORD */}
      <TouchableOpacity
        style={styles.headerForgotPassword}
        onPress={() => nothingPassword()}>
        <Text style={styles.txtForgot}>Forgot </Text>
        <Text style={styles.txtPassword}>Password?</Text>
      </TouchableOpacity>

      {/* LOGIN */}
      <TouchableOpacity
        onPress={() => getData()}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LinearGradient colors={['#40EC15', '#688F16']} style={styles.login}>
          <Text style={styles.txtLogin}>Let's Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* CONNECTED TO GOOGLE */}
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

      {/* LINE */}
      <View style={styles.line} />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
  },
  ViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '5%',
  },
  Masjid: {
    height: hp('27%'),
    width: wp('100%'),
    // borderRadius: 10,
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
    alignItems: 'flex-end',
    right: '9%',
  },
  eye: {
    bottom: 46,
    height: 30,
    width: 25,
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
    // marginHorizontal: 95,
    borderRadius: 100,
    height: height / 11,
    width: width / 2,
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
    borderWidth: 2,
    color: colors.black,
    bottom: 10,
    marginTop: '18%',
    marginLeft: 128,
    borderRadius: 20,
  },
});
