import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, icons, images} from '../../assets';
import {GlobalContext} from '../../Store/globalContext';
import {getMoviesFromApi} from '../../services/TestConsume';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {TabView, SceneMap} from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopTab from './TopTab';

const Home = ({navigation, route, item}) => {
  const [notifikation, setNotifikation] = useState();
  const [activeTab, setActiveTab] = useState('tab1'); // Buat state untuk mengatur tab aktif
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;

  const getData = async () => {
    const result = await getMoviesFromApi();
    console.log('result...', result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={dark ? colors.black : colors.green}
      />
      {/* BODY TEXT WELCOME HOME */}
      <View
        style={[
          styles.body,
          {
            backgroundColor: dark ? colors.black : colors.green,
          },
        ]}>
        <ScrollView>
          <View style={styles.headerTxtWelcome}>
            <Text
              style={[
                styles.textWelcome,
                {fontSize: dimens.l, color: dark ? colors.white : colors.black},
              ]}>
              Assalamualaikum, Selamat
            </Text>
            <View style={styles.viewMuslimIndonesia}>
              <Text
                style={[
                  styles.textWelcome,
                  {
                    fontSize: dimens.l,
                    color: dark ? colors.white : colors.black,
                  },
                ]}>
                Datang di
              </Text>
              <View style={styles.TxtMuslim}>
                <Text
                  style={[
                    styles.textWelcomeMuslim,
                    {
                      fontSize: dimens.l,
                      color: dark ? colors.white : colors.white,
                    },
                  ]}>
                  Muslim
                </Text>
                <Text
                  style={[
                    styles.textWelcomeMuslim,
                    {
                      fontSize: dimens.l,
                      color: dark ? colors.yellow : colors.yellow,
                    },
                  ]}>
                  Indonesia.
                </Text>
              </View>
            </View>

            {/* NAME USER / ADMIN */}
            <View style={styles.bodyTxtUser}>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: dimens.l,
                    color: dark ? colors.white : colors.black,
                  },
                ]}>
                Rafi Zimraan
              </Text>

              {/* NOTIFICATION & IAMGE USER */}
              <View style={styles.bodynotifAndUser}>
                <TouchableOpacity
                  onPress={() => setNotifikation(!notifikation)}
                  style={{paddingRight: 5}}>
                  <Image
                    source={
                      notifikation ? icons.notifColor : icons.notification
                    }
                    style={styles.imgNotif}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={images.user} style={styles.imgUser} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* TEXTINPUT */}
          <View style={styles.textInput}>
            <View style={styles.bodyTextInput}>
              <Image source={icons.search} style={styles.imgSearch} />
              <TextInput
                style={styles.ViewTextInput}
                placeholder="Cari Masjid terdekat..."
              />
            </View>
          </View>

          {/* CAROSEL KAJIAN */}
          <LinearGradient
            colors={['#40EC15', '#688F16']}
            style={styles.contentCarosel}>
            <View style={{flexDirection: 'row'}}>
              <Image source={images.kiayEen} style={styles.imgCarosel} />
              <View style={styles.contentCard}>
                <Text style={styles.bodyTextTitle}>
                  Dr. Adi Pratama Larisindo
                </Text>
                <Text style={styles.bodyTextChild}>
                  Pentingnya islam untuk dunia ini
                </Text>
              </View>
            </View>
            <View style={styles.bottomDate}>
              <View style={styles.viewBottom}>
                <Image source={icons.calendar} style={styles.viewCalendar} />
                <Text style={styles.txtDate}>28, juni, 19.00</Text>
              </View>
            </View>
          </LinearGradient>

          {/* TOP TAB */}
          <View style={styles.bodyTopTab}>
            <View style={styles.Line} />
            <View style={styles.viewTopTab}>
              <TopTab />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    height: hp('100%'),
    width: wp('100%'),
  },
  headerTxtWelcome: {
    marginTop: '5%',
    marginLeft: 20,
  },
  viewMuslimIndonesia: {
    flexDirection: 'row',
  },
  textWelcome: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: dimens.xxl,
    color: colors.black,
    textAlign: 'left',
  },
  TxtMuslim: {
    flexDirection: 'row',
  },
  textWelcomeMuslim: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: dimens.xxl,
    color: colors.black,
    textAlign: 'left',
    paddingLeft: 5,
  },
  bodyTxtUser: {
    marginTop: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: dimens.xxl,
    color: colors.black,
  },
  bodynotifAndUser: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    bottom: '65%',
    marginRight: '5%',
  },
  imgNotif: {
    height: hp('4%'),
    width: wp('8%'),
  },
  imgUser: {
    height: hp('7%'),
    width: wp('15%'),
  },
  textInput: {
    flexDirectiion: 'row',
    alignItems: 'center',
    bottom: 20,
  },
  bodyTextInput: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 25,
  },
  imgSearch: {
    marginHorizontal: 10,
    marginTop: '3%',
    height: hp('4%'),
    width: wp('7%'),
  },
  ViewTextInput: {
    height: hp('7%'),
    width: wp('80%'),
  },
  contentCarosel: {
    marginHorizontal: 20,
    height: '11%',
    borderRadius: 10,
  },
  imgCarosel: {
    height: hp('16%'),
    width: wp('22%'),
    marginLeft: 17,
  },
  contentCard: {
    marginTop: '6%',
  },
  bodyTextTitle: {
    fontSize: dimens.l,
    fontFamily: fonts.PoppinsMedium,
    color: colors.white,
  },
  bodyTextChild: {
    fontSize: dimens.s,
    fontFamily: fonts.PoppinsMedium,
    color: colors.white,
  },
  bottomDate: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 45,
    backgroundColor: colors.white,
    marginLeft: '61%',
    height: hp('4%'),
    width: wp('33%'),
    borderRadius: 10,
  },
  viewBottom: {
    flexDirection: 'row',
  },
  viewCalendar: {
    height: hp('3%'),
    width: wp('5%'),
    marginRight: 13,
  },
  txtDate: {
    color: colors.black,
    fontFamily: dimens.PoppinsMedium,
  },
  fotter: {
    backgroundColor: colors.white,
    height: hp('100%'),
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  bodyTopTab: {
    backgroundColor: colors.primary,
    height: hp('100%'),
    marginTop: '12%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  Line: {
    borderWidth: 1.8,
    borderRadius: 10,
    color: colors.red,
    width: wp('15%'),
    marginTop: '12%',
    bottom: 40,
    marginLeft: '44%',
  },
  viewTopTab: {
    height: hp('100%'),
    width: wp('94%'),
    alignSelf: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: colors.yellow,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.black,
  },
  activeTabItem: {
    backgroundColor: colors.green,
  },
  tabText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.PoppinsMedium,
  },
});

export default Home;
