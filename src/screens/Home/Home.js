import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, icons, images} from '../../assets';
import {GlobalContext} from '../../Store/globalContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import TopTab from './TopTab';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import DataCarousel from './DataCarousel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;

const Home = ({navigation}) => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;

  const [notifikation, setNotifikation] = useState(false);
  const [index, setIndex] = useState(0);
  const {width: screenWidth} = Dimensions.get('window');
  const sliderWidth = screenWidth;
  const itemWidth = screenWidth * 0.8;
  const carouselPagination = useRef(null);

  // ? RENDER CAROUSEL
  const renderItem = ({item}) => (
    <LinearGradient
      colors={['#40EC15', '#688F16']}
      style={styles.contentCarosel}>
      <View style={{flexDirection: 'row'}}>
        <Image source={item.imageUstad} style={styles.imgCarosel} />
        <View style={styles.contentCard}>
          <Text style={styles.bodyTextTitle}>{item.title}</Text>
          <Text style={styles.bodyTextChild}>{item.body}</Text>
        </View>
      </View>
      <View style={styles.bottomDate}>
        <Image source={item.iconCalendar} style={styles.viewCalendar} />
        <Text style={styles.txtDate}>{item.textClock}</Text>
      </View>
    </LinearGradient>
  );

  // ! CAROUSEL
  useEffect(() => {
    const timerCarousel = setInterval(() => {
      if (carouselPagination.current) {
        const nextIndex = (index + 1) % DataCarousel.length;
        if (nextIndex === 0) {
          carouselPagination.current.snapToItem(0);
          setIndex(0);
        } else {
          carouselPagination.current.snapToItem(nextIndex);
          setIndex(nextIndex);
        }
      }
    }, 2000);

    return () => {
      clearInterval(timerCarousel);
    };
  }, [index]);

  // ! Di simpan di LocalStorage
  const [dataAll, setDataAll] = useState({
    full_name: '',
    photo: '',
  });

  useEffect(() => {
    try {
      AsyncStorage.getItem('UserData').then(response => {
        if (response !== null) {
          const user_data = JSON.parse(response);
          if (user_data.full_name && user_data.photo) {
            setDataAll(user_data);
          }
        } else {
          console.log('Data "UserData" belum tersedia di AsyncStorage');
        }
      });
    } catch (error) {
      console.log('Error while fetching user data :', error);
    }
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
        <ScrollView style={{flex: 1}}>
          <View style={styles.headerTxtWelcome}>
            <Text
              style={[
                styles.textWelcome,
                {
                  fontSize: dimens.l,
                  color: dark ? colors.white : colors.black,
                },
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
                      fontSize: dimens.xl,
                      color: dark ? colors.white : colors.white,
                    },
                  ]}>
                  Muslim
                </Text>
                <Text
                  style={[
                    styles.textWelcomeMuslim,
                    {
                      fontSize: dimens.xl,
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
                {dataAll && dataAll.full_name ? dataAll.full_name : 'User'}
              </Text>

              {/*IAMGE USER */}
              <View style={styles.bodynotifAndUser}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Admin')}
                  style={styles.BodyUser}>
                  <Image
                    source={
                      dataAll.photo && dataAll.photo !== ''
                        ? {uri: dataAll.photo}
                        : images.user
                    }
                    style={styles.imgUser}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* 
    
          {/* TEXTINPUT */}
          <View style={styles.textInput}>
            <TouchableOpacity
              style={styles.bodyTextInput}
              onPress={() => navigation.navigate('DataSearch')}>
              <Image source={icons.search} style={styles.imgSearch} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setNotifikation(!notifikation)}
              style={{paddingRight: 5}}>
              <Image
                source={notifikation ? icons.notification : icons.notifColor}
                style={styles.imgNotif}
              />
            </TouchableOpacity>
          </View>

          {/* CAROSEL KAJIAN */}
          <Carousel
            ref={carouselPagination}
            layout="default"
            data={DataCarousel}
            renderItem={renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            loop={true}
            autoplay={true}
            autoplayInterval={6000}
            onSnapToItem={index => setIndex(index)}
          />
          <Pagination
            dotsLength={DataCarousel.length}
            carouselRef={carouselPagination}
            activeDotIndex={index}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 10,
              bottom: 10,
              backgroundColor: colors.white,
            }}
            inactiveDotStyle={{
              backgroundColor: colors.white,
            }}
            inactiveDotOpacity={0.2}
            inactiveDotScale={0.8}
          />

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
    marginTop: '3%',
    marginLeft: 10,
  },
  viewMuslimIndonesia: {
    flexDirection: 'row',
    bottom: 5,
  },
  textWelcome: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: dimens.l,
    color: colors.black,
    textAlign: 'left',
  },
  TxtMuslim: {
    flexDirection: 'row',
    bottom: 4,
  },
  textWelcomeMuslim: {
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.black,
    textAlign: 'left',
    paddingLeft: 5,
  },
  bodyTxtUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 10,
  },
  text: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: dimens.xl,
    color: colors.black,
    textAlign: 'left',
    height: '40%',
    width: width / 2,
    bottom: 6,
  },
  bodynotifAndUser: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    bottom: '65%',
    marginRight: '2%',
  },
  imgNotif: {
    height: hp('4%'),
    width: wp('8%'),
  },
  BodyUser: {
    marginRight: 10,
  },
  imgUser: {
    height: hp('8%'),
    width: wp('18%'),
    borderRadius: 48,
  },
  textInput: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 40,
  },
  bodyTextInput: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 6,
    width: wp('83%'),
    height: hp('6%'),
    alignItems: 'center',
    borderWidth: 1.1,
  },
  imgSearch: {
    marginHorizontal: 10,
    height: hp('4%'),
    width: wp('7%'),
  },
  ViewTextInput: {
    height: hp('6%'),
    textShadowColor: '#688F16',
    color: colors.black,
  },
  buttonEnter: {
    backgroundColor: colors.white,
    height: '93%',
    width: '14%',
    borderRadius: 10,
  },
  searchButton: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: dimens.l,
    color: colors.black,
    textAlign: 'center',
    marginVertical: 10,
  },
  contentCarosel: {
    height: 180,
    borderRadius: 10,
    padding: 20,
  },
  imgCarosel: {
    height: hp('20%'),
    width: wp('27%'),
  },
  contentCard: {
    height: hp('10%'),
  },
  bodyTextTitle: {
    fontSize: dimens.xl,
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.black,
  },
  bodyTextChild: {
    fontSize: dimens.s,
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    textAlign: 'justify',
    // textAlignVertical: 'auto',
    // width: wp('48%'),
    marginVertical: 6,
    backgroundColor: colors.blue,
  },
  bottomDate: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: hp('4%'),
    width: wp('35%'),
    borderRadius: 10,
    marginLeft: '53%',
    bottom: 60,
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
    backgroundColor: colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  Line: {
    borderWidth: 1.8,
    borderRadius: 10,
    width: wp('15%'),
    marginTop: '12%',
    bottom: 40,
    marginLeft: '44%',
  },
  viewTopTab: {
    height: hp('100%'),
    width: wp('100%'),
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
