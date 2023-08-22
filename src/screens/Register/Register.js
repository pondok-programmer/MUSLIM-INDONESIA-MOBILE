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
} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Register = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryPassConfrim, setSecureTextEntryPassConfrim] =
    useState(true);
  const [full_name, setFull_name] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, SetPassword_confirmation] = useState();
  const [phone_number, setPhone_number] = useState();
  const [email, setEmail] = useState();

  const Reg = async () => {
    try {
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

      if (!phone_number.startsWith('62')) {
        Alert.alert('Perhatian!', 'Nomor telepon harus di awali dengan 62 ');
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
        phone_number,
        navigation,
      });
      console.log('result...', result);

      if (result) {
        // Tampilkan pesan sukses
        ToastAndroid.show('Berhasil mendaftarkan akun', ToastAndroid.SHORT);

        // Navigasi ke screen Login jika semua data telah diisi
        navigation.goBack();
      }
    } catch (error) {
      // Tangani kesalahan jika API tidak berfungsi atau ada masalah lain
      console.log('Error', error);
    }
  };

  useEffect(() => {
    Reg();
  }, []);

  // ! SecureTextEntry password
  const togglesecureTextEntry = () => {
    setSecureTextEntry(praveState => !praveState);
  };

  // ! SecureTextEntry Confrim_password
  const togglesecureTextEntryConfrim_password = () => {
    setSecureTextEntryPassConfrim(praveState => !praveState);
  };

  // ! Image eye
  const eyeIcon = secureTextEntry ? icons.show : icons.eye;
  const eyeIconConfrim = secureTextEntryPassConfrim ? icons.show : icons.eye;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar barStyle={'light-content'} backgroundColor={colors.green} />
        <View style={styles.ViewContainer}>
          <Image source={images.Masjid} style={styles.Masjid} />
          <View style={styles.bodyText}>
            <Text style={styles.textMasjid}>Muslim </Text>
            <Text style={styles.textIndo}>Indonesia</Text>
          </View>
        </View>
        <View style={styles.contentTxtHeading}>
          <Text style={styles.txtCreate}>Create</Text>
          <Text style={styles.txtAccount}> Account</Text>
        </View>

        {/* DESCRIPTION MUSLIM INDO */}
        <View style={styles.bodyDes}>
          <Text style={styles.bodyTextDescription}>
            " Selamat datang di Muslim Indonesia, Mari kita menjalani hari
            dengan semangat keimanan. Dapatkan Restoran & kajian - kajian serta
            Masjid Sidaq di lokasi Anda, dan nikmati berbagai fitur berguna
            lainnya untuk mendukung kehidupan Anda."
          </Text>
        </View>

        {/* TEXTINPUT */}
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
        <Fumi
          label={'+62'}
          iconClass={Icon}
          iconName={'phone'}
          iconColor={'#54B435'}
          iconSize={25}
          iconWidth={40}
          inputPadding={16}
          keyboardType="number-pad"
          style={styles.fumiPassword}
          color={colors.black}
          onChangeText={val => setPhone_number(val)}
        />
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
            <Image source={eyeIcon} style={styles.eye} />
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

        {/* FOOTER */}
        <TouchableOpacity
          onPress={() => Reg()}
          style={{justifyContent: 'center', alignItems: 'center'}}>
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
            <Image source={icons.GoggleIndo} style={styles.Goggle} />
          </TouchableOpacity>
        </View>

        {/* have a account */}
        <View style={styles.createAccount}>
          <Text style={styles.txtQuestions}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.txtCreateAccount}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
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
  contentTxtHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3%',
  },
  txtCreate: {
    color: colors.white,
    fontFamily: fonts.PoppinsBold,
    fontSize: dimens.xxxl,
  },
  txtAccount: {
    color: colors.yellow,
    fontFamily: fonts.PoppinsBold,
    fontSize: dimens.xxxl,
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
    borderRadius: 10,
    marginTop: '2%',
    height: hp('10%'),
  },
  fumiConfrimPassword: {
    marginHorizontal: 20,
    borderRadius: 10,
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
  contentCreate: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: width / 2,
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
    borderWidth: 1.8,
    color: colors.black,
    marginTop: '10%',
    bottom: 7,
    marginLeft: 128,
    borderRadius: 10,
  },
});
