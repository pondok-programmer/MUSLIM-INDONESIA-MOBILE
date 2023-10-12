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
import {CalendarSVG, ClockSVG, LocationSVG} from '../AssetsSVg';

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
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Image source={images.posterkajian} style={styles.img} />
            </TouchableOpacity>
            <Text style={styles.txtTitle}>Mengkaji dengan metode syi'ah</Text>
          </View>

          {/* LOCATION */}
          <View style={styles.location}>
            <LocationSVG height={20} width={20} />
            <Text style={styles.textLocation}>Yogyakarta</Text>
          </View>

          {/* CLOCK */}
          <View style={styles.locationClock}>
            <ClockSVG height={20} width={30} />
            <Text style={styles.textClock}>24.00 pm</Text>
          </View>

          {/* DATE */}
          <View style={styles.locationCalender}>
            <CalendarSVG width={22} height={30} />
            <Text style={styles.textLocation}>Monday, 18-04-2023</Text>
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
    marginTop: '2%',
  },
  contentTextinput: {
    height: hp('6%'),
    width: wp('80%'),
  },
  contentKajian: {
    width: wp('90%'),
    height: hp('18%'),
    marginHorizontal: 20,
    marginTop: '6%',
    borderRadius: 10,
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
    fontFamily: fonts.PoppinsSemiBold,
    textAlign: 'left',
    width: wp('58%'),
    height: hp('6%'),
    marginTop: '2%',
    marginHorizontal: 5,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '45%',
    bottom: 87,
    width: 120,
  },
  locationClock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '43%',
    bottom: 87,
    width: 120,
  },
  locationCalender: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '40%',
    bottom: 87,
  },
  textLocation: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    marginLeft: 6,
  },
  textClock: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    marginLeft: 6,
  },
});
