import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Loader} from '../../components';
import {colors, dimens} from '../../utils';
import {fonts, icons, images} from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {postLogin} from '../../services/Auth';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Login = ({navigation}) => {
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async () => {
    Keyboard.dismiss();

    if (!email || !isValidEmail(email)) {
      handleError(!email ? 'Please input email' : 'Invalid email', 'email');
      return;
    }

    if (!password || password.length < 8) {
      handleError(
        !password
          ? 'Please input password'
          : 'Password must be at least 8 characters long',
        'password',
      );
      return;
    }

    try {
      setLoading(true);

      const result = await postLogin({email, password}); // Memanggil fungsi postLogin
      console.log('result...', result);

      setLoading(false);

      if (result && result.token) {
        await AsyncStorage.setItem('token', result.token);
        await AsyncStorage.setItem('Username', result.fullname);
        console.log('Token saved successfully');

        navigation.replace('MainNavigator'); // Mengganti route ke MainNavigator setelah login sukses
        ToastAndroid.show('Selamat Datang', ToastAndroid.SHORT); // Menampilkan pesan selamat datang
      } else if (
        result &&
        result.message === 'Email or password is incorrect.'
      ) {
        Alert.alert(
          'Login Failed',
          'Email or password is incorrect. Check kembali email dan password anda.',
        ); // Menampilkan pesan kesalahan jika login gagal
      } else {
        console.log('Login failed or no token received.');
      }
    } catch (error) {
      console.log('Error during login:', error); // Menampilkan pesan kesalahan jika terjadi masalah saat login
    }
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const isValidEmail = email => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.green} />
      <Loader visible={loading} />
      <View style={{paddingHorizontal: 20}}>
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

        {/* TEXTINPUT */}
        <View>
          <Input
            onChangeText={val => setEmail(val)}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
            containerStyle={styles.inputContainer} // Added style here
            inputStyle={styles.inputText} // Added style here
            placeholderTextColor={colors.grey}
          />

          <Input
            onChangeText={val => setPassword(val)}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
            containerStyle={styles.inputContainer} // Added style here
            inputStyle={styles.inputText} // Added style here
            placeholderTextColor={colors.grey}
          />

          {/* LOGIN */}
          <TouchableOpacity
            onPress={() => handleLogin()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: '10%',
            }}>
            <LinearGradient
              colors={['#40EC15', '#688F16']}
              style={styles.login}>
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
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.line} />
          </View>
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
  ViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Masjid: {
    height: hp('27%'),
    width: wp('100%'),
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
    // marginVertical: 10,
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
  inputContainer: {
    backgroundColor: colors.white, // Light semi-transparent white
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputText: {
    color: colors.black,
    fontFamily: fonts.PoppinsRegular,
    backgroundColor: colors.blue,
  },
  rowContainer: {
    marginVertical: '37%',
    right: 0,
    position: 'absolute',
  },
  bodyEye: {
    marginBottom: 10,
    alignItems: 'flex-end',
    right: '25%',
  },
  eye: {
    bottom: 46,
    height: 30,
    width: 25,
  },
  headerForgotPassword: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    bottom: 40,
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
    borderRadius: 100,
    height: height / 11,
    width: '80%',
  },
  txtLogin: {
    fontFamily: fonts.PoppinsBold,
    color: colors.white,
    fontSize: dimens.xxl,
  },
  bodyConnect: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtConnect: {
    fontSize: dimens.m,
    fontFamily: fonts.PoppinsBold,
    color: colors.white,
  },
  Goggle: {
    width: wp('11%'),
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    top: 8,
  },
  createAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
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
    width: width / 2,
    borderWidth: 1.8,
    color: colors.black,
    marginVertical: '8%',
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default Login;
