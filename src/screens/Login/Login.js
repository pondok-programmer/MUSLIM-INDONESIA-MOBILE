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
  Modal,
  Button,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Loader} from '../../components';
import {colors, dimens} from '../../utils';
import {fonts, images} from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {postLogin} from '../../services/Auth';
import {IconGoogleSVG} from '../AssetsSVg';
import {useRef} from 'react';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Login = ({navigation}) => {
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isMounted = useRef(true);

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

      const result = await postLogin({email, password});
      console.log('result...', result);

      if (
        result &&
        result.token &&
        result.UserData &&
        result.UserData.full_name
      ) {
        await AsyncStorage.setItem('token', result.token);
        await AsyncStorage.setItem('full_name', result.UserData.full_name);
        await AsyncStorage.setItem('username', result.UserData.username);
        await AsyncStorage.setItem('UserData', JSON.stringify(result.UserData));
        await AsyncStorage.setItem(
          'user_credential',
          JSON.stringify({email, password}),
        );

        console.log('Token saved successfully');
        navigation.replace('MainNavigator');
        ToastAndroid.show(
          `Selamat Datang ${result.UserData.full_name}`,
          ToastAndroid.SHORT,
        );
      } else if (
        result &&
        result.message === 'Email or password is incorrect.'
      ) {
        Alert.alert(
          'Login Failed',
          'Email or password is incorrect. Check kembali email dan password anda.',
        );
      } else {
        console.log('Login failed or no token received.');
        showErrorModal('Maaf sedang tidak baik-baik saja.');
      }
    } catch (error) {
      console.log('Error during login:', error);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // ! MODAL
  const showErrorModal = message => {
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  // ! ERROR TEXTINPUT
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const isValidEmail = email => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <StatusBar barStyle={'light-content'} backgroundColor={colors.green} />
      {/* Modal Error */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => {
          setErrorModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.PoppinsBold,
                marginBottom: 10,
                fontSize: dimens.xl,
                color: colors.black,
              }}>
              Error
            </Text>
            <Text
              style={{
                color: colors.black,
                fontSize: dimens.l,
                fontFamily: fonts.PoppinsRegular,
              }}>
              {errorMessage}
            </Text>
            <Button
              title="Tutup"
              onPress={() => {
                setErrorModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>

      <View style={{paddingHorizontal: 20}}>
        {/* NAVBAR iMAGES */}
        <View style={styles.ViewContainer}>
          <Image source={images.logoMuslimIndo} style={styles.Masjid} />
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
            placeholderTextColor={colors.grey}
          />

          {/* LOGIN */}
          <TouchableOpacity
            onPress={() => handleLogin()}
            style={{
              alignItems: 'center',
              marginTop: 36,
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
              <IconGoogleSVG style={styles.Goggle} />
            </TouchableOpacity>
          </View>
          <View style={styles.createAccount}>
            <Text style={styles.txtQuestions}>Don't have an account</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.txtCreateAccount}>Create account</Text>
            </TouchableOpacity>
          </View>

          {/* LINE */}
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
    flexDirection: 'row',
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
    marginTop: 25,
  },
  txtConnect: {
    fontSize: dimens.m,
    fontFamily: fonts.PoppinsBold,
    color: colors.white,
  },
  Goggle: {
    width: wp('9%'),
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
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
});

export default Login;
