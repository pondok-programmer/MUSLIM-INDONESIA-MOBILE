import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fonts, icons, images} from '../../assets';
import {colors, dimens} from '../../utils';

const Masjid = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* CONTENT 1 */}
      <View style={styles.contentAll}>
        <View style={styles.bodyContent}>
          <Image source={images.mapsMuslimIndonesia} style={styles.imgMaps} />
          <Image source={icons.location} style={styles.location} />
        </View>
        <View style={styles.bodyTitleMasjid}>
          <View style={styles.bodyMasjid}>
            <Text style={styles.textTitle}>Masjid AL-Husna</Text>
            <TouchableOpacity>
              <Image source={icons.vectorSave} style={styles.iconSave} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textAuthor}>Oleh Rafi Zimraan</Text>
        </View>
      </View>

      {/* CONTENT 2 */}
      <View style={styles.contentAll2}>
        <View style={styles.bodyContent}>
          <Image source={images.mapsMuslimIndonesia} style={styles.imgMaps} />
          <Image source={icons.location} style={styles.location} />
        </View>
        <View style={styles.bodyTitleMasjid}>
          <View style={styles.bodyMasjid}>
            <Text style={styles.textTitle}>Masjid AL-Husna</Text>
            <TouchableOpacity>
              <Image source={icons.vectorSave} style={styles.iconSave} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textAuthor}>Oleh Rafi Zimraan</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Masjid;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AEAEAE',
    marginHorizontal: 20,
    marginTop: 20,
    height: hp('25%'),
    borderRadius: 10,
  },
  contentAll: {
    backgroundColor: '#AEAEAE',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  contentAll2: {
    backgroundColor: '#AEAEAE',
    marginTop: 50,
    height: hp('31%'),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bodyContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgMaps: {
    marginTop: 5,
    borderRadius: 10,
    width: wp('87%'),
    height: hp('21%'),
  },
  bodyTitleMasjid: {
    alignItems: 'flex-start',
    marginLeft: 22,
    bottom: 25,
  },
  bodyMasjid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('78%'),
  },
  textTitle: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    fontSize: dimens.l,
  },
  iconSave: {
    height: hp('2%'),
    width: wp('3'),
  },
  location: {
    height: hp('5%'),
    width: wp('7%'),
    bottom: 100,
  },
  textAuthor: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    fontSize: dimens.xs,
  },
});
