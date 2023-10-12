import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  DrawerLayoutAndroid,
  Alert,
} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, icons, images} from '../../assets';
import {ButtonCustom} from '../../components';
import {GlobalContext} from '../../Store/globalContext';
import {StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useRef} from 'react';
import {postLogout} from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserUpdate} from '../EditProfile/UserUpdate';
import {ProfileRead} from '../../services/AuthProfile';

const Setting = ({navigation, route}) => {
  const {user} = UserUpdate();
  const drawerLeft = useRef(null);
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;

  const _setDarkTheme = () => {
    if (dark == true) {
      return false;
    }
    globalContext.dispatch({type: 'TOGGLE_IS_DARK'});
  };

  const _setLightTheme = () => {
    if (dark == false) {
      return false;
    }
    globalContext.dispatch({type: 'TOGGLE_IS_DARK'});
  };

  console.log(globalContext.state);

  // ! RENDER API LOGOUT
  const logOut = async () => {
    try {
      const result = await postLogout();
      console.log('result...', result);

      await AsyncStorage.removeItem('token'); // Remove token from AsyncStorage
      console.log('Token Removed');

      navigation.replace('Login');
      console.log('Suksesfull logout for application');
    } catch (error) {
      console.log('Errong ducing logout', error);
    }
  };

  // ? ALERT WARNING
  const warning = () => {
    Alert.alert('Perhatian !', 'Apakah anda ingin keluar', [
      {
        text: 'Tidak',
      },
      {
        text: 'Ok',
        onPress: () => logOut(),
      },
    ]);
  };

  // ! READ PROFILE
  const [dataProfile, setDataProfile] = useState({});
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const username = await AsyncStorage.getItem('username');
        if (!username) {
          console.log('Username tidak tersedia');
          return;
        }
        const users = await ProfileRead(username);
        setDataProfile(users?.users || dataProfile);
      } catch (error) {
        console.log('Error reading profile in setting:', error);
      }
    }
    if (isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // ! DRAWER LAYOUT ANDROID
  const drawerLayout = (
    <View
      style={[
        styles.Containerdrawer,
        {backgroundColor: dark ? colors.black : colors.white},
      ]}>
      {/* TEXT 7 ICON */}
      <View style={styles.navbarTxtAndIconRight}>
        <Text
          style={[
            styles.txtTitleDrawer,
            {
              fontSize: dimens.l,
              color: dark ? colors.white : colors.black,
            },
          ]}>
          Pengaturan
        </Text>
        <TouchableOpacity onPress={() => drawerLeft.current?.closeDrawer()}>
          <Image source={icons.right} style={styles.iconRight} />
        </TouchableOpacity>
      </View>

      {/* DATA STORAGE */}
      <View style={styles.bodyPenyimpanan}>
        <Text
          style={[
            styles.txtSaveDataTitle,
            {fontSize: dimens.l, color: dark ? colors.white : colors.black},
          ]}>
          PENYIMPANAN
        </Text>

        <TouchableOpacity style={styles.contentStorageSaveDatas}>
          <Image source={icons.vectorSave} style={styles.VectorSave} />
          <Text
            style={[
              styles.txtSaveData,
              {fontSize: dimens.l, color: dark ? colors.white : colors.black},
            ]}>
            Penyimpanan
          </Text>
        </TouchableOpacity>
      </View>

      {/* LOG OUT */}
      <View style={styles.bodyLogout}>
        <Text
          style={[
            styles.txtSaveDataTitle,
            {fontSize: dimens.l, color: dark ? colors.white : colors.black},
          ]}>
          Log Out
        </Text>
        <TouchableOpacity
          style={styles.contentStorageSaveDatas}
          onPress={() => warning()}>
          <Image source={icons.logOut} style={styles.VectorLogout} />
          <Text
            style={[
              styles.txtSaveData,
              {fontSize: dimens.l, color: dark ? colors.white : colors.black},
            ]}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.green} />
      <DrawerLayoutAndroid
        ref={drawerLeft}
        drawerWidth={270}
        drawerPosition={'left'}
        renderNavigationView={() => drawerLayout}
        style={{flex: 1}}>
        <View style={styles.body}>
          {/* ICON SETTING */}
          <TouchableOpacity
            style={styles.ContentSetting}
            onPress={() => drawerLeft.current?.openDrawer()}>
            <Image source={icons.setting} style={styles.setting} />
          </TouchableOpacity>

          {/* TOGGLE DARK */}
          <ButtonCustom
            title="Dark"
            onPress={_setDarkTheme}
            color={dark ? colors.black : colors.green}
            textStyle={{color: dark ? colors.white : colors.black}}
          />
          <ButtonCustom
            title="Light"
            color={dark ? colors.green : colors.black}
            style={{marginTop: dimens.m, color: colors.black}}
            onPress={_setLightTheme}
            buttonStyle={{marginTop: dimens.l, bottom: 7, color: colors.black}}
          />

          {/* IMAGE USER & NAME USER/ADMIN */}
          <View style={styles.ContentImageUser}>
            <TouchableOpacity style={styles.viewImageUser}>
              <Image
                source={
                  dataProfile.photo && dataProfile.photo !== ''
                    ? {uri: dataProfile.photo}
                    : images.user
                }
                style={styles.user}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.textImageUser,
                {
                  fontSize: dimens.l,
                  color: dark ? colors.white : colors.black,
                },
              ]}>
              {dataProfile.username ? dataProfile.username : 'User'}
            </Text>

            {/* TEXT EMAIL */}
            <View style={styles.bodyEmail}>
              <Text
                style={[
                  styles.txtEmail,
                  {
                    fontSize: dimens.l,
                    color: dark ? colors.white : colors.black,
                  },
                ]}>
                {dataProfile.email ? dataProfile.email : 'user@gmail.com'}
              </Text>
            </View>

            {/* BUTTON EDIT PROFILE */}
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}>
              <LinearGradient
                colors={['#EBEBEB', '#EBEBEB']}
                style={styles.bodyEditProfile}>
                <Text style={styles.txtEditProfile}>Edit Profile</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.line} />
          </View>

          {/* CONTENT PROFILE */}
          <View
            style={[
              styles.ContentProfile,
              {
                backgroundColor: dark ? colors.black : colors.white,
              },
            ]}>
            {/* CARD PROFILE */}
            <View style={styles.CardProfile}>
              <TouchableOpacity style={styles.viewBodyCardEmail}>
                <View style={styles.bodyIconEmail} />
                <Image
                  source={
                    dataProfile.photo && dataProfile.photo !== ''
                      ? {uri: dataProfile.photo}
                      : images.user
                  }
                  style={styles.userIconImgUser}
                />
              </TouchableOpacity>
              <View style={styles.titleTextProfile}>
                <Text style={styles.cardTxtTitleProfile}>PROFILE</Text>
                <Text style={styles.cardTxtTitleProfileDes}>
                  {dataProfile.full_name ? dataProfile.full_name : 'user'}
                </Text>
              </View>
            </View>

            {/* CARD TELEPHONE */}
            <View style={styles.Cardlocation}>
              <TouchableOpacity style={styles.viewBodyCardTelephone}>
                <View style={styles.bodyIconEmail} />
                <Image source={icons.phoneCall} style={styles.userTelephone} />
              </TouchableOpacity>
              <View style={styles.titleTextTelephone}>
                <Text style={styles.cardTxtTitleProfile}>Telephone</Text>
                <Text style={styles.cardTxtTitleProfileDes}>
                  {dataProfile.phone_number ? dataProfile.phone_number : '00**'}
                </Text>
              </View>
            </View>

            {/* CARD EMAIL */}
            <View style={styles.CardEmail}>
              <TouchableOpacity style={styles.viewBodyCardEmail}>
                <View style={styles.bodyIconEmail} />
                <Image source={icons.gmail} style={styles.userIcon} />
              </TouchableOpacity>
              <View style={styles.titleTextProfile}>
                <Text style={styles.cardTxtTitleProfile}>EMAIL</Text>
                <Text style={styles.cardTxtTitleProfileDes}>
                  {dataProfile.email ? dataProfile.email : 'user@gmail.com'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </DrawerLayoutAndroid>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Containerdrawer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  navbarTxtAndIconRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  txtTitleDrawer: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: dimens.l,
    color: colors.black,
  },
  iconRight: {
    height: hp('5%'),
    width: wp('7%'),
    marginLeft: 4,
  },
  bodyPenyimpanan: {
    marginTop: '10%',
    marginLeft: '5%',
  },
  bodyLogout: {
    marginTop: '10%',
    marginLeft: '5%',
  },
  contentStorageSaveDatas: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  VectorSave: {
    height: hp('3%'),
    width: wp('4%'),
  },
  VectorLogout: {
    height: hp('4%'),
    width: wp('8%'),
  },
  txtSaveDataTitle: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: dimens.l,
    color: colors.black,
  },
  txtSaveData: {
    marginLeft: 10,
    fontFamily: fonts.PoppinsRegular,
    fontSize: dimens.l,
    color: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.green,
  },
  body: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.green,
  },
  ContentSetting: {
    top: '4%',
    marginLeft: 30,
    width: wp('8%'),
  },
  setting: {
    height: hp('4%'),
    width: wp('8%'),
  },
  buttonCustomA: {
    height: hp('10%'),
  },
  ContentImageUser: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '6%',
  },
  viewImageUser: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    height: hp('11%'),
    width: wp('23%'),
    borderRadius: 20,
  },
  textImageUser: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: dimens.xxl,
    color: colors.black,
    marginTop: '2%',
  },
  bodyEmail: {
    marginTop: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEmail: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: dimens.l,
    color: colors.black,
  },
  bodyEditProfile: {
    height: hp('5%'),
    width: wp('34%'),
    marginTop: '3%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEditProfile: {
    fontFamily: fonts.PoppinsReguler,
    fontSize: dimens.l,
    color: colors.black,
  },
  line: {
    borderWidth: 0.4,
    borderRadius: 10,
    width: wp('75%'),
    top: '13%',
    marginLeft: 10,
  },
  backgroound1: {
    backgroundColor: colors.red,
    width: '15%',
    height: '6%',
    marginLeft: '87%',
    borderBottomRightRadius: 80,
    top: '1.4%',
    zIndex: 50,
  },
  backgroound2: {
    backgroundColor: colors.white,
    width: '10%',
    height: '7%',
    borderTopLeftRadius: 70,
    marginLeft: '90%',
    bottom: 44,
  },
  ContentProfile: {
    backgroundColor: colors.white,
    height: hp('100%'),
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: '20%',
    bottom: 44,
  },
  CardProfile: {
    backgroundColor: colors.green,
    marginTop: '7%',
    height: hp('12%'),
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
  Cardlocation: {
    backgroundColor: colors.green,
    marginTop: '3%',
    height: hp('12%'),
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
  CardEmail: {
    backgroundColor: colors.green,
    marginTop: '3%',
    height: hp('12%'),
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
  viewBodyCardEmail: {
    marginTop: '2%',
    alignItems: 'center',
  },
  viewBodyCardTelephone: {
    marginTop: '2%',
    alignItems: 'center',
  },
  bodyIconEmail: {
    backgroundColor: colors.white,
    height: hp('10%'),
    width: wp('20%'),
    borderRadius: 10,
  },
  userIcon: {
    height: hp('6.2%'),
    width: wp('13%'),
    bottom: '80%',
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  userIconImgUser: {
    height: hp('6.2%'),
    width: wp('13%'),
    bottom: '80%',
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  userTelephone: {
    height: hp('6.2%'),
    width: wp('13%'),
    bottom: '80%',
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  titleTextProfile: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  titleTextTelephone: {
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  cardTxtTitleProfile: {
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.black,
    fontSize: dimens.xxl,
    alignItems: 'flex-start',
  },
  cardTxtTitleProfileDes: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    fontSize: dimens.m,
    alignItems: 'center',
  },
});

export default Setting;
