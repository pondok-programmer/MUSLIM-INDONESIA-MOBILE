import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {fonts, icons, images} from '../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, dimens} from '../../utils';

const Restoran = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* CONTENT 1 */}
      <View style={styles.contentAll}>
        <View style={styles.bodyContent}>
          <Image source={images.food} style={styles.imgMaps} />
        </View>
        <View style={styles.bodyTitleResto}>
          <View style={styles.bodyResto}>
            <Text style={styles.textTitle}>Ayam Crispy</Text>
            <Text style={styles.textAuthor}>Sayuran dan daging dari UK,</Text>
            <View style={styles.viewDesAndClock}>
              <Text style={styles.textAuthor}>
                dengan citra rasa yang spektakuler
              </Text>
              <Text style={styles.textAuthor}>4 jam yang lalu</Text>
            </View>
          </View>
        </View>
      </View>

      {/* CONTENT 2 */}
      <View style={styles.contentAll2}>
        <View style={styles.bodyContent}>
          <Image source={images.food} style={styles.imgMaps} />
        </View>
        <View style={styles.bodyTitleResto}>
          <View style={styles.bodyResto}>
            <Text style={styles.textTitle}>Ayam Crispy</Text>
            <Text style={styles.textAuthor}>Sayuran dan daging dari UK,</Text>
            <View style={styles.viewDesAndClock}>
              <Text style={styles.textAuthor}>
                dengan citra rasa yang spektakuler
              </Text>
              <Text style={styles.textAuthor}>4 jam yang lalu</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Restoran;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AEAEAE',
    marginHorizontal: 20,
    marginTop: 20,
    height: hp('30%'),
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
    height: hp('30%'),
    marginTop: 50,
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
    marginTop: 9,
    borderRadius: 10,
    width: wp('87%'),
    height: hp('21%'),
  },
  bodyTitleResto: {
    alignItems: 'flex-start',
    marginLeft: 10,
    bottom: 5,
  },
  bodyResto: {
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
    fontSize: dimens.xs,
    textAlign: 'left',
  },
  viewDesAndClock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('83%'),
  },
});
