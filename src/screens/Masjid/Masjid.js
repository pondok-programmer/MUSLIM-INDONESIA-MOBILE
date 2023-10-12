import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fonts, icons} from '../../assets';
import {colors, dimens} from '../../utils';
import {MasjidPost} from '../../services/AuthMasjid';

const Masjid = () => {
  const [userdata, setUserdata] = useState();

  const getDataMasjid = async () => {
    try {
      const {user} = await MasjidPost();

      setUserdata(user);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  useEffect(() => {
    getDataMasjid();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {userdata
          ?.filter(user => user.categories.toLowerCase() == 'masjid')
          .map((user, index) => (
            <View key={index} style={styles.contentAll}>
              <View style={styles.addressContainer}>
                <Text style={styles.textAddress}>
                  {user.district} {user.regency} {user.province}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => Linking.openURL('https://maps.google.co.id')}>
                <Image source={{uri: user.photo}} style={styles.imgMaps} />
              </TouchableOpacity>
              <View style={styles.titleContainer}>
                <Text style={styles.textTitle}>{user.place_name}</Text>
                <TouchableOpacity>
                  <Image source={icons.vectorSave} style={styles.iconSave} />
                </TouchableOpacity>
              </View>
              <View style={styles.authorContainer}>
                <Text style={styles.textAuthor}>{user.addres}</Text>
                <Text style={styles.textAuthor}>{user.username}</Text>
              </View>
            </View>
          ))}
        {/* <View style={{paddingBottom: 20}} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
  },
  contentAll: {
    backgroundColor: '#AEAEAE',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    paddingVertical: 5,
  },
  textAddress: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: dimens.l,
    color: colors.lightBlack,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  imgMaps: {
    borderRadius: 10,
    width: wp('84%'),
    height: hp('21%'),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginVertical: 5,
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    fontSize: dimens.xl,
  },
  iconSave: {
    height: 20,
    width: 15,
  },
  authorContainer: {
    marginLeft: 12,
  },
  textAuthor: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    fontSize: dimens.l,
    bottom: 10,
  },
});

export default Masjid;
