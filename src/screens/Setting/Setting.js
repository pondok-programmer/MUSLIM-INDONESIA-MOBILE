import React, {useContext} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  DrawerLayoutAndroid,
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

const Setting = ({navigation, route}) => {
  const drawerLeft = useRef(DrawerLayoutAndroid);
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

  // ! DRAWER LAYOUT ANDROID
  const drawerLayout = (
    <View
      style={[
        styles.Containerdrawer,
        {backgroundColor: dark ? colors.black : colors.white},
      ]}>
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
        <Image source={icons.right} style={styles.iconRight} />
      </View>
      <View style={{alignItems: 'flex-end', paddingRight: 35}}>
        <Image
          source={images.user}
          style={{height: hp('5%'), width: wp('6%')}}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={dark ? colors.black : colors.green}
      />
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
          <ButtonCustom title="Dark" onPress={_setDarkTheme} />
          <ButtonCustom
            title="Light"
            color={colors.black}
            style={{marginTop: dimens.m}}
            onPress={_setLightTheme}
            buttonStyle={{marginTop: dimens.l, bottom: 7}}
          />

          {/* IMAGE USER & NAME USER/ADMIN */}
          <View style={styles.ContentImageUser}>
            <TouchableOpacity style={styles.viewImageUser}>
              <Image source={images.user} style={styles.user} />
            </TouchableOpacity>
            <Text
              style={[
                styles.textImageUser,
                {
                  fontSize: dimens.l,
                  color: dark ? colors.white : colors.black,
                },
              ]}>
              Rafi
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
                raffizimraan27@gmail.com
              </Text>
            </View>

            {/* BUTTON EDIT PROFILE */}
            <TouchableOpacity>
              <LinearGradient
                colors={['#D9D9D9', '#D9D9D9']}
                style={styles.bodyEditProfile}>
                <Text style={styles.txtEditProfile}>Edit Profile</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.line} />
          </View>

          {/* BACKGROUND FOR PAGE SETTING  */}
          <View style={styles.backgroound1} />
          <View
            style={[
              styles.backgroound2,
              {backgroundColor: dark ? colors.black : colors.white},
            ]}
          />

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
                <Image source={icons.IconUser} style={styles.userIcon} />
              </TouchableOpacity>
              <View style={styles.titleTextProfile}>
                <Text style={styles.cardTxtTitleProfile}>PROFILE</Text>
                <Text style={styles.cardTxtTitleProfileDes}>
                  Rafi zimraan arjuna wijaya
                </Text>
              </View>
            </View>

            {/* CARD LOCATION */}
            <View style={styles.Cardlocation}>
              <TouchableOpacity style={styles.viewBodyCardEmail}>
                <View style={styles.bodyIconEmail} />
                <Image source={icons.location} style={styles.userLocation} />
              </TouchableOpacity>
              <View style={styles.titleTextProfile}>
                <Text style={styles.cardTxtTitleProfile}>LOCATION</Text>
                <Text style={styles.cardTxtTitleProfileDes}>
                  Special Regency of Yogyakarta
                </Text>
              </View>
            </View>

            {/* CARD EMAIL */}
            <View style={styles.CardEmail}>
              <TouchableOpacity style={styles.viewBodyCardEmail}>
                <View style={styles.bodyIconEmail} />
                <Image source={icons.Email} style={styles.userIcon} />
              </TouchableOpacity>
              <View style={styles.titleTextProfile}>
                <Text style={styles.cardTxtTitleProfile}>EMAIL</Text>
                <Text style={styles.cardTxtTitleProfileDes}>
                  raffizimraan27@gmail.com
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
    backgroundColor: colors.green,
    width: '13%',
    height: '7%',
    marginLeft: '87%',
    borderBottomRightRadius: 80,
    top: '1.3%',
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
    borderTopLeftRadius: 60,
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
    marginLeft: '2%',
  },
  bodyIconEmail: {
    backgroundColor: colors.white,
    height: hp('10%'),
    width: wp('20%'),
    borderRadius: 10,
  },
  userIcon: {
    height: hp('4%'),
    width: wp('8%'),
    bottom: '59%',
    marginLeft: '21%',
  },
  userLocation: {
    height: hp('4%'),
    width: wp('6%'),
    bottom: '59%',
    marginLeft: '24%',
  },
  titleTextProfile: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardTxtTitleProfile: {
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.black,
    fontSize: dimens.xxl,
  },
  cardTxtTitleProfileDes: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    fontSize: dimens.m,
  },
});

export default Setting;
