import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Dimensions,
  Modal,
  TouchableHighlight,
  Button,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors, dimens} from '../../utils';
import {fonts, icons, images} from '../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Fumi} from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';
import {postRegister} from '../../services/AuthRegister';
import {IconGoogleSVG} from '../AssetsSVg';
import {Loader} from '../../components';
import PhoneInput from 'react-native-phone-number-input';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Register = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryPassConfrim, setSecureTextEntryPassConfrim] =
    useState(true);
  const [full_name, setFull_name] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, SetPassword_confirmation] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isMounted = useRef(true);
  const phoneInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState('');

  const Reg = async () => {
    try {
      setLoading(true);
      // Validasi Full_name
      if (full_name.trim().length === 0) {
        Alert.alert('Perhatian!', 'Nama lengkap harus diisi');
        return;
      }

      // Validasi Username
      if (!username) {
        Alert.alert('Perhatian!', 'Username harus diisi');
        return;
      }

      // Validasi phone_number
      if (!phone_number) {
        Alert.alert('Perhatian!', 'Nomor telepone harus diisi');
        return;
      }

      // Validasi Email
      if (!email) {
        Alert.alert('Perhatian!', 'Email harus diisi');
        return;
      }

      if (!email.includes('@gmail.com')) {
        Alert.alert('Perhatian!', 'Email harus mengunakan @gmail.com');
        return;
      }

      // Validasi Password
      if (!password) {
        Alert.alert('Perhatian!', 'Password harus diisi');
        return;
      }

      if (password.length < 8) {
        Alert.alert('Perhatian!', 'Password harus minimal 8 karakter');
        return;
      }

      // Validasi Condfrim_Password
      if (!password_confirmation) {
        Alert.alert('Perhatian!', 'Konfirmasi password harus diisi');
        return;
      }

      if (password_confirmation.length < 8) {
        Alert.alert(
          'Perhatian!',
          'Password confirmasi harus minimal 8 karakter',
        );
        return;
      }

      if (password_confirmation !== password) {
        Alert.alert(
          'Perhatian!',
          'Konfirmasi password tidak sama dengan password',
        );
        return;
      }

      // Valdasi semua input disini
      if (
        !full_name ||
        !username ||
        !phone_number ||
        !email ||
        !password ||
        !password_confirmation
      ) {
        Alert.alert('Perhatian!', 'Anda harus mengisi semua input');
        return;
      }

      const result = await postRegister({
        full_name,
        username,
        email,
        password,
        password_confirmation,
        phone_number: formattedValue,
        navigation,
      });
      console.log('result...', result);

      if (result) {
        ToastAndroid.show('Berhasil mendaftarkan akun', ToastAndroid.SHORT);
        if (navigation && navigation.goBack) {
          navigation.goBack();
        }
      } else {
        console.log('Register failed or no token received.');
        showErrorModal('maaf sedang tidak baik-baik saja.');
      }
    } catch (error) {
      console.log('Error during login ', error);
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
    if (navigation && navigation.goBack) {
      setErrorMessage(message);
      setModalVisible(true);
    }
  };

  // ! SecureTextEntry password
  const togglesecureTextEntry = () => {
    setSecureTextEntry(praveState => !praveState);
  };

  // ! SecureTextEntry Confrim_password
  const togglesecureTextEntryConfrim_password = () => {
    setSecureTextEntryPassConfrim(praveState => !praveState);
  };

  // ! Image eye
  const eyeIconSVG = secureTextEntry ? icons.show : icons.eye;
  const eyeIconConfrim = secureTextEntryPassConfrim ? icons.show : icons.eye;

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setModalVisible(modalVisible);
              }}>
              <Button
                title={'tTutup'}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <ScrollView>
        <StatusBar barStyle={'light-content'} backgroundColor={colors.green} />
        <View style={styles.ViewContainer}>
          <Image source={images.logoMuslimIndo} style={styles.Masjid} />
        </View>
        <View style={styles.contentTxtHeading}>
          <Text style={styles.txtCreate}>Create</Text>
          <Text style={styles.txtAccount}> Account</Text>
        </View>

        {/* FULLNAME */}
        <Fumi
          label={'Full name'}
          iconClass={Icon}
          iconName={'card-account-details-outline'}
          iconColor={'#54B435'}
          iconSize={25}
          iconWidth={40}
          inputPadding={16}
          style={styles.fumiPassword}
          color={colors.black}
          onChangeText={val => setFull_name(val)}
        />

        {/* USERNAME */}
        <Fumi
          label={'Username'}
          iconClass={Icon}
          iconName={'account-circle-outline'}
          iconColor={'#54B435'}
          iconSize={25}
          iconWidth={40}
          inputPadding={16}
          style={styles.fumiPassword}
          color={colors.black}
          onChangeText={val => setUsername(val)}
        />

        {/* PHONE_NUMBER */}
        <PhoneInput
          ref={phoneInput}
          defaultValue={phone_number}
          defaultCode="DM"
          layout="first"
          containerStyle={styles.phone_number}
          onChangeText={text => {
            setPhone_number(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
          autoFocus
        />

        {/* EMAIL */}
        <Fumi
          label={'Email'}
          iconClass={Icon}
          iconName={'email-outline'}
          iconColor={'#54B435'}
          iconSize={25}
          iconWidth={40}
          inputPadding={16}
          keyboardType="name-phone-pad"
          style={styles.fumiPassword}
          color={colors.black}
          onChangeText={val => setEmail(val)}
        />

        {/* PASSWORD */}
        <Fumi
          label={'Password'}
          iconClass={Icon}
          iconName={'lock-open-variant-outline'}
          iconColor={'#54B435'}
          iconSize={25}
          iconWidth={40}
          inputPadding={16}
          keyboardType="name-phone-pad"
          secureTextEntry={secureTextEntry}
          style={styles.fumiPassword}
          color={colors.black}
          onChangeText={val => setPassword(val)}
        />

        {/*ICON EYE */}
        <View style={styles.bodyEyePassword}>
          <TouchableOpacity onPress={togglesecureTextEntry}>
            <Image source={eyeIconSVG} style={styles.eyePassword} />
          </TouchableOpacity>
        </View>

        <Fumi
          label={'Confrim password'}
          iconClass={Icon}
          iconName={'lock-alert-outline'}
          iconColor={'#54B435'}
          iconSize={25}
          iconWidth={40}
          inputPadding={16}
          keyboardType="name-phone-pad"
          secureTextEntry={secureTextEntryPassConfrim}
          style={styles.fumiConfrimPassword}
          color={colors.black}
          onChangeText={val => SetPassword_confirmation(val)}
        />

        {/*ICON EYE */}
        <View style={styles.bodyEye}>
          <TouchableOpacity onPress={togglesecureTextEntryConfrim_password}>
            <Image source={eyeIconConfrim} style={styles.eye} />
          </TouchableOpacity>
        </View>

        {/* CREATE ACCOUNT */}
        <TouchableOpacity
          onPress={() => Reg()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LinearGradient
            colors={['#40EC15', '#688F16']}
            style={styles.contentCreate}>
            <Text style={styles.bodyTxtCreate}>Create Account</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* login with goggle */}
        <View style={styles.bodyConnect}>
          <Text style={styles.txtConnect}>Connect With</Text>
          <TouchableOpacity>
            <IconGoogleSVG style={styles.Goggle} />
          </TouchableOpacity>
        </View>

        {/* have a account */}
        <View style={styles.createAccount}>
          <Text style={styles.txtQuestions}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={styles.txtCreateAccount}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.line} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
  },
  ViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  Masjid: {
    height: hp('20%'),
    width: wp('60%'),
  },
  contentTxtHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
  },
  txtCreate: {
    color: colors.white,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: dimens.xxl,
  },
  txtAccount: {
    color: colors.yellow,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: dimens.xxl,
  },
  bodyDes: {
    marginTop: 5,
  },
  bodyTextDescription: {
    color: colors.white,
    textAlign: 'center',
    bottom: 14,
  },
  fumiPassword: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginTop: '2%',
    height: hp('10%'),
  },
  phone_number: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginTop: '2%',
    height: '6.8%',
    width: '90%',
  },

  fumiConfrimPassword: {
    marginHorizontal: 20,
    height: hp('10%'),
    bottom: 22,
  },
  bodyEyePassword: {
    alignItems: 'flex-end',
    right: '9%',
  },
  bodyEye: {
    alignItems: 'flex-end',
    right: '9%',
    bottom: 20,
  },
  eye: {
    bottom: 46,
    height: 30,
    width: 25,
  },
  eyePassword: {
    bottom: 55,
    height: 30,
    width: 25,
  },
  contentCreate: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: '80%',
    height: height / 11,
  },
  bodyTxtCreate: {
    fontFamily: fonts.PoppinsBold,
    fontSize: dimens.xxl,
    color: colors.white,
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
    width: wp('9%'),
    height: hp('5%'),
  },
  createAccount: {
    justifyContent: 'center',
    alignItems: 'center',
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
    borderWidth: 1.8,
    color: colors.black,
    marginTop: '10%',
    bottom: 7,
    borderRadius: 10,
  },
});
