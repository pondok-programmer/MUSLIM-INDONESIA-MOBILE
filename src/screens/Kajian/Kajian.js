import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useContext} from 'react';
import {colors, dimens} from '../../utils';
import {fonts, icons, images} from '../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {GlobalContext} from '../../Store/globalContext';

const Kajian = () => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgrounColor={dark ? colors.black : colors.green}
      />

      {/* TEXTINPUT */}
      <View
        style={[
          styles.bodyAll,
          {backgroundColor: dark ? colors.black : colors.green},
        ]}>
        <View style={styles.TextInput}>
          <View style={styles.bodyTextInput}>
            <Image source={icons.search} style={styles.ImgSearch} />
            <TextInput
              placeholder={'Info seputar kajian '}
              style={styles.contentTextinput}
            />
          </View>
        </View>

        {/* CONTENT KAJIAN */}
        <LinearGradient
          colors={['#ffffff', '#ffffff']}
          style={styles.contentKajian}>
          <View style={styles.body}>
            <TouchableOpacity>
              <Image source={images.posterkajian} style={styles.img} />
            </TouchableOpacity>
            <Text style={styles.txtTitle}>Mengkaji dengan metode syi'ah</Text>
          </View>

          {/* LOCATION */}
          <View style={styles.location}>
            <TouchableOpacity>
              <Image source={icons.location} style={styles.imgLocation} />
            </TouchableOpacity>
            <Text style={styles.textLocation}>Yogyakarta</Text>
          </View>

          {/* LOCATION */}
          <View style={styles.locationCalender}>
            <Image source={icons.calendar} style={styles.imgCalendar} />
            <Text style={styles.textLocation}>Monday, 18-04-2023</Text>
          </View>

          {/* LOCATION */}
          <View style={styles.location}>
            <Image source={icons.clock} style={styles.imgClock} />
            <Text style={styles.textLocation}>Yogyakarta</Text>
          </View>
        </LinearGradient>

        {/* CONTENT KAJIAN 2 */}
        <LinearGradient
          colors={['#ffffff', '#ffffff']}
          style={styles.contentKajian}>
          <View style={styles.body}>
            <TouchableOpacity>
              <Image source={images.posterkajian} style={styles.img} />
            </TouchableOpacity>
            <Text style={styles.txtTitle}>Mengkaji dengan metode syi'ah</Text>
          </View>

          {/* LOCATION */}
          <View style={styles.location}>
            <TouchableOpacity>
              <Image source={icons.location} style={styles.imgLocation} />
            </TouchableOpacity>
            <Text style={styles.textLocation}>Yogyakarta</Text>
          </View>

          {/* LOCATION */}
          <View style={styles.locationCalender}>
            <Image source={icons.calendar} style={styles.imgCalendar} />
            <Text style={styles.textLocation}>Monday, 18-04-2023</Text>
          </View>

          {/* LOCATION */}
          <View style={styles.location}>
            <Image source={icons.clock} style={styles.imgClock} />
            <Text style={styles.textLocation}>Yogyakarta</Text>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default Kajian;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
  },
  bodyAll: {
    height: hp('100%'),
    width: wp('100%'),
  },
  TextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  bodyTextInput: {
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: colors.white,
  },
  ImgSearch: {
    marginHorizontal: 10,
    height: hp('4%'),
    width: wp('7%'),
    marginTop: '3%',
  },
  contentTextinput: {
    height: hp('7%'),
    width: wp('80%'),
  },
  contentKajian: {
    width: wp('90%'),
    height: hp('18%'),
    marginHorizontal: 20,
    marginTop: '10%',
    borderRadius: 10,
  },
  body: {
    flexDirection: 'row',
  },
  img: {
    height: hp('17%'),
    width: wp('40%'),
    marginHorizontal: 3,
    marginTop: 4,
    borderRadius: 10,
  },
  txtTitle: {
    fontSize: dimens.xl,
    color: colors.black,
    fontFamily: fonts.PoppinsBold,
    textAlign: 'left',
    width: wp('52%'),
    marginTop: '2%',
    marginHorizontal: 5,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '21%',
    bottom: 95,
    paddingLeft: 10,
    padding: 3,
  },
  locationCalender: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '41%',
    bottom: 97,
    padding: 3,
  },
  imgLocation: {
    height: hp('2%'),
    width: wp('3%'),
    marginRight: 8,
  },
  textLocation: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
  },
  imgCalendar: {
    height: hp('2%'),
    width: wp('4%'),
    marginRight: 8,
  },
  imgClock: {
    height: hp('2%'),
    width: wp('4%'),
    marginRight: 8,
  },
});
