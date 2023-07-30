import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors, dimens} from '../../utils';
import {fonts, icons, images} from '../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Fumi} from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';

const Register = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar barStyle={'light-content'} backgroundColor={colors.green1} />
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
        <View>
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
          iconName={'lock-outline'}
          iconColor={'#54B435'}
          iconSize={25}
          iconWidth={40}
          inputPadding={16}
          style={styles.fumiPassword}
          color={colors.black}
        />
        <Fumi
          label={'User name'}
          iconClass={Icon}
          iconName={'lock-outline'}
          iconColor={'#54B435'}
          iconSize={25}
          iconWidth={40}
          inputPadding={16}
          style={styles.fumiPassword}
          color={colors.black}
        />
        <Fumi
          label={'+62'}
          iconClass={Icon}
          iconName={'lock-outline'}
          iconColor={'#54B435'}
          iconSize={25}
          iconWidth={40}
          inputPadding={16}
          keyboardType="number-pad"
          style={styles.fumiPassword}
          color={colors.black}
        />
        <Fumi
          label={'Email'}
          iconClass={Icon}
          iconName={'lock-outline'}
          iconColor={'#54B435'}
          iconSize={25}
          iconWidth={40}
          inputPadding={16}
          keyboardType="name-phone-pad"
          style={styles.fumiPassword}
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
          keyboardType="name-phone-pad"
          secureTextEntry={true}
          style={styles.fumiPassword}
          color={colors.black}
        />
        <Fumi
          label={'Confrim password'}
          iconClass={Icon}
          iconName={'lock-outline'}
          iconColor={'#54B435'}
          iconSize={25}
          iconWidth={40}
          inputPadding={16}
          keyboardType="name-phone-pad"
          secureTextEntry={true}
          style={styles.fumiPassword}
          color={colors.black}
        />

        {/* FOOTER */}
        <TouchableOpacity>
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
  bodyTextDescription: {
    color: colors.white,
    textAlign: 'center',
    bottom: 14,
  },
  fumiPassword: {
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: '2%',
    height: hp('10%'),
  },
  contentCreate: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 95,
    borderRadius: 100,
    width: wp('56%'),
    height: hp('8'),
    marginTop: '4%',
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
    borderWidth: 3,
    color: colors.black,
    bottom: '1%',
    marginTop: '6%',
    marginLeft: 128,
    borderRadius: 20,
  },
});
