import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fonts, images} from '../../assets';
import {colors, dimens} from '../../utils';

const Masjid = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContent}>
        <Image source={images.mapsMuslimIndonesia} style={styles.imgMaps} />
      </View>
      <View style={styles.bodyTitleMasjid}>
        <Text style={styles.textTitle}>Masjid AL-Husna</Text>
        <Text style={styles.textAuthor}>Oleh Rafi Zimraan</Text>
      </View>
    </SafeAreaView>
  );
};

export default Masjid;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AEAEAE',
    marginHorizontal: 20,
    marginTop: 10,
    height: hp('25%'),
  },
  bodyContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgMaps: {
    marginTop: 5,
    borderRadius: 10,
    width: wp('80%'),
    height: hp('16%'),
  },
  bodyTitleMasjid: {
    alignItems: 'flex-start',
    marginLeft: 12,
    marginTop: 10,
  },
  textTitle: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    fontSize: dimens.l,
  },
  textAuthor: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    fontSize: dimens.s,
  },
});
