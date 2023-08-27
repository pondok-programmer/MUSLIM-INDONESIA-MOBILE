import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
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
import {postReadContentMasjid} from '../../services';
import {useEffect} from 'react';
import {useState} from 'react';
import {MasjidPost} from '../../services/AuthMasjid';

const height = Dimensions.get('screen').height;

const Masjid = () => {
  const [userData, setUserData] = useState([]);

  // ! CONTOH
  // const getData = async () => {
  //   const result = await getMoviesFromApi();
  //   console.log('result...', result);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  // ! READ API
  const getDataMasjid = async () => {
    try {
      const {user} = await MasjidPost();
      console.log('response...', user);
      setUserData(user);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  useEffect(() => {
    getDataMasjid();
  }, []);

  return (
    // <ScrollView>
    <SafeAreaView style={{flex: 1, backgroundColor: colors.blue}}>
      {/* ! CONTENT 1 */}
      <View style={styles.contentAll2}>
        {userData.map((user, index) => (
          <View key={index} style={styles.contentAll}>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              <Text style={styles.textCompliteAddres}>{user.district}</Text>
              <Text style={styles.textCompliteAddres}> {user.regency}</Text>
              <Text style={styles.textCompliteAddres}> {user.province}</Text>
            </View>
            <View style={styles.bodyContent}>
              <Image source={{uri: user.photo}} style={styles.imgMaps} />
            </View>
            <View style={styles.bodyTitleMasjid}>
              <Text style={styles.textTitle}>{user.place_name}</Text>
              <TouchableOpacity>
                <Image
                  source={icons.vectorSave}
                  style={{
                    height: 20,
                    width: 15,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: 8}}>
              <Text style={styles.textAuthor}>{user.username}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* CONTENT 2 */}
      <View style={styles.contentAll2}>
        {userData.map((user, index) => (
          <View key={index} style={styles.contentAll}>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              <Text style={styles.textCompliteAddres}>{user.district}</Text>
              <Text style={styles.textCompliteAddres}> {user.regency}</Text>
              <Text style={styles.textCompliteAddres}> {user.province}</Text>
            </View>
            <View style={styles.bodyContent}>
              <Image source={{uri: user.photo}} style={styles.imgMaps} />
            </View>
            <View style={styles.bodyTitleMasjid}>
              <Text style={styles.textTitle}>{user.place_name}</Text>
              <TouchableOpacity>
                <Image
                  source={icons.vectorSave}
                  style={{
                    height: 20,
                    width: 15,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: 8}}>
              <Text style={styles.textAuthor}>{user.username}</Text>
            </View>
          </View>
        ))}
      </View>
      {/* <View style={styles.contentAll2}>
        {userData.map((user, index) => (
          <View key={index} style={styles.contentAll}>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              <Text style={styles.textCompliteAddres}>{user.district}</Text>
              <Text style={styles.textCompliteAddres}> {user.regency}</Text>
              <Text style={styles.textCompliteAddres}> {user.province}</Text>
            </View>
            <View style={styles.bodyContent}>
              <Image source={{uri: user.photo}} style={styles.imgMaps} />
            </View>
            <View style={styles.bodyTitleMasjid}>
              <Text style={styles.textTitle}>{user.place_name}</Text>
              <TouchableOpacity>
                <Image
                  source={icons.vectorSave}
                  style={{
                    height: 20,
                    width: 15,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: 8}}>
              <Text style={styles.textAuthor}>{user.username}</Text>
            </View>
          </View>
        ))}
      </View> */}
    </SafeAreaView>
    // </ScrollView>
  );
};

export default Masjid;

const styles = StyleSheet.create({
  contentAll: {
    backgroundColor: '#AEAEAE',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginVertical: 10,
  },
  textCompliteAddres: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: dimens.l,
    color: colors.lightBlack,
  },
  contentAll2: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  bodyContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  imgMaps: {
    borderRadius: 10,
    width: wp('91%'),
    height: hp('21%'),
  },
  bodyTitleMasjid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  bodyMasjid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('78%'),
  },
  textTitle: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    fontSize: dimens.xl,
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
    fontSize: dimens.l,
    bottom: 10,
  },
});
