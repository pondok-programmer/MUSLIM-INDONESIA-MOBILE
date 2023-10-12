import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts, icons} from '../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, dimens} from '../../utils';
import {MasjidPost} from '../../services/AuthMasjid';

const Restoran = () => {
  const [restoranData, setRestoranData] = useState([]);

  const getDataRestoran = async () => {
    try {
      const {user} = await MasjidPost();
      console.log('response...', user);

      setRestoranData(user);
    } catch (error) {
      console.log('Error fecthing data', error);
    }
  };

  useEffect(() => {
    getDataRestoran();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* CONTENT 1 */}
      <View style={styles.contentAll2}>
        {restoranData
          ?.filter(user => user.categories.toLowerCase() == 'restoran')
          .map((user, index) => (
            <View key={index} style={styles.contentAll}>
              <View style={styles.addressContainer}>
                <Text style={styles.textCompleteAddress}>
                  {user.district} {user.regency} {user.province}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.bodyContent}
                onPress={() => Linking.openURL('https://maps.google.co.id')}>
                <Image source={{uri: user.photo}} style={styles.imgMaps} />
              </TouchableOpacity>
              <View style={styles.bodyTitleMasjid}>
                <Text style={styles.textTitle}>{user.place_name}</Text>
                <TouchableOpacity>
                  <Image source={icons.vectorSave} style={styles.imgBookmark} />
                </TouchableOpacity>
              </View>
              <View style={{marginLeft: 12}}>
                <Text style={styles.textAuthor}>{user.addres}</Text>
                <Text style={styles.textAuthor}>{user.username}</Text>
              </View>
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
};

export default Restoran;

const styles = StyleSheet.create({
  contentAll2: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },
  contentAll: {
    backgroundColor: '#AEAEAE',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginVertical: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  textCompleteAddress: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: dimens.l,
    color: colors.lightBlack,
  },
  bodyContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  imgMaps: {
    borderRadius: 10,
    width: wp('84%'),
    height: hp('21%'),
  },
  bodyTitleMasjid: {
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
  imgBookmark: {
    height: 20,
    width: 15,
  },
  textAuthor: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    fontSize: dimens.l,
    bottom: 10,
  },
});
