import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {fonts, icons, images} from '../../assets';
import {colors, dimens} from '../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {MasjidPost} from '../../services/AuthMasjid';

const Tpq = () => {
  const [dataTpq, setDataTpq] = useState([]);

  const getDataTpq = async () => {
    try {
      const {user} = await MasjidPost();
      console.log('response...', user);
      setDataTpq(user);
    } catch (error) {
      console.log('Error fecthing data', error);
    }
  };

  useEffect(() => {
    getDataTpq();
  }, []);

  return (
    <SafeAreaView>
      {/* CONTENT 1 */}

      <View style={styles.contentAll2}>
        {dataTpq.map((user, index) => (
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
      <View style={styles.contentAll2}>
        {dataTpq.map((user, index) => (
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
      <View style={styles.contentAll2}>
        {dataTpq.map((user, index) => (
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
      <View style={styles.contentAll2}>
        {dataTpq.map((user, index) => (
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
      <View style={styles.contentAll2}>
        {dataTpq.map((user, index) => (
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
        <View style={styles.bodyContent}>
          <Image source={images.mapsMuslimIndonesia} style={styles.imgMaps} />
          <Image source={icons.location} style={styles.location} />
        </View>
        <View style={styles.bodyTitleTpq}>
          <View style={styles.bodyTpq}>
            <Text style={styles.textTitle}>Masjid AL-Husna</Text>
            <TouchableOpacity>
              <Image source={icons.vectorSave} style={styles.iconSave} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textAuthor}>Tempat Kanak-kanak</Text>
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default Tpq;

const styles = StyleSheet.create({
  contentAll2: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 10,
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
  textCompliteAddres: {
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
  textTitle: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    fontSize: dimens.xl,
  },
  textAuthor: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    fontSize: dimens.l,
    bottom: 10,
  },
});
