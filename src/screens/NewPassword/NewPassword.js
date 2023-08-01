import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, icons, images} from '../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';

const NewPassword = ({navigation}) => {
  const [secureTextEntryConfrim, setSecureTextEntryConfrim] = useState(true);
  const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.green} />
      <ScrollView>
        {/*ICONS LEFT */}
        <TouchableOpacity
          style={styles.bodyLeft}
          onPress={() => navigation.goBack()}>
          <Image source={icons.left} style={styles.iconLeft} />
        </TouchableOpacity>

        {/* IMAGES NEW PASSWORD */}
        <View style={styles.contentImg}>
          <Image source={images.NewPassword} style={styles.img} />
        </View>

        {/* TEXT INFORMATION */}
        <View style={styles.bodyTxtNewPassword}>
          <Text style={styles.New}>New</Text>
          <Text style={styles.password}> Password!</Text>
        </View>
        <View style={styles.ViewTxtDescription}>
          <Text style={styles.textDescription}>
            Password anda telah kami riset, silahkan membuat password baru
          </Text>
        </View>

        {/* TEXTINPUT PASSWORD */}
        <LinearGradient
          colors={['#AEAEAE', '#AEAEAE']}
          style={styles.contentEmail}>
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            placeholderTextColor={colors.lightBlack}
            secureTextEntry={secureTextEntryPassword}
          />
        </LinearGradient>

        {/* TEXTINPUT CONFRIM PASSWORD */}
        <LinearGradient
          colors={['#AEAEAE', '#AEAEAE']}
          style={styles.contentPassword}>
          <TextInput
            placeholder="Confrim Password"
            style={styles.textInput}
            placeholderTextColor={colors.lightBlack}
            secureTextEntry={secureTextEntryConfrim}
          />
        </LinearGradient>

        <View style={styles.bodyEyePassword}>
          <TouchableOpacity
            onPress={() => setSecureTextEntryPassword(pas => !pas)}>
            <Image source={icons.eye} style={styles.eye} />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyEye}>
          <TouchableOpacity
            onPress={() => setSecureTextEntryConfrim(val => !val)}>
            <Image source={icons.eye} style={styles.eye} />
          </TouchableOpacity>
        </View>

        {/* NEW PASSWORD */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <LinearGradient
            colors={['#40EC15', '#688F16']}
            style={styles.newPassword}>
            <Text style={styles.txtNewPassword}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
        {/* LINE */}
        <View style={styles.line} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
  },
  bodyLeft: {
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
  img: {
    height: hp('36%'),
    width: wp('84%'),
  },
  bodyTxtNewPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  New: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: dimens.xxxxl,
    color: colors.white,
  },
  password: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: dimens.xxxxl,
    color: colors.yellow,
  },
  ViewTxtDescription: {
    marginHorizontal: 45,
    bottom: 10,
  },
  textDescription: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.PoppinsRegular,
  },
  bodyEyePassword: {
    alignItems: 'flex-end',
    bottom: '16%',
    right: '12%',
  },
  bodyEye: {
    alignItems: 'flex-end',
    bottom: '9%',
    right: '12%',
  },
  eye: {
    height: hp('3%'),
    width: wp('6%'),
  },
  contentEmail: {
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
  },
  contentPassword: {
    marginTop: '2%',
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
  },
  newPassword: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 10,
    height: hp('8%'),
    width: wp('86%'),
    marginTop: '8%',
  },
  txtNewPassword: {
    fontSize: dimens.xl,
    fontFamily: fonts.PoppinsBold,
    color: colors.white,
  },
  line: {
    backgroundColor: colors.black,
    borderWidth: 3,
    bottom: 5,
    marginLeft: 125,
    width: wp('40%'),
    marginTop: '15%',
  },
});
