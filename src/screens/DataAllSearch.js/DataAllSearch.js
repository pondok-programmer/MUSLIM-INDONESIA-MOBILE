import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Image,
} from 'react-native';
import {GlobalContext} from '../../Store/globalContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {MasjidPost} from '../../services/AuthMasjid';
import {colors, dimens} from '../../utils';
import {fonts, icons} from '../../assets';
import {useEffect} from 'react';
import FilterSearch from './FIlterSearch';

const DataAllSearch = ({navigation}) => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  const [userdata, setUserdata] = useState();
  const [filteredData, setFilteredData] = useState();

  // ! GET ALL DATA
  const getData = async () => {
    try {
      const {user} = await MasjidPost();
      setFilteredData(user);
      setUserdata(user);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ! FITUR SEARCH
  const onSearch = searchVal => {
    if (searchVal === '') return setFilteredData(userdata);
    setFilteredData(prevData =>
      prevData.filter(
        data =>
          data.place_name.toLowerCase().includes(searchVal.toLowerCase()) ||
          data.province.toLowerCase().includes(searchVal.toLowerCase()) ||
          data.regency.toLowerCase().includes(searchVal.toLowerCase()) ||
          data.district.toLowerCase().includes(searchVal.toLowerCase()) ||
          data.village.toLowerCase().includes(searchVal.toLowerCase()),
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={dark ? colors.black : colors.green}
      />
      <View
        style={[
          styles.body,
          {
            backgroundColor: dark ? colors.black : colors.green,
          },
        ]}>
        <ScrollView>
          <TouchableOpacity>
            <FilterSearch
              navigation={navigation}
              onSearch={onSearch}
              onChangeText={val => onSearch(val)}
            />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {filteredData?.map((user, index) => (
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
            <View style={styles.bottomSpacer} />
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DataAllSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    width: wp('100%'),
    height: hp('100%'),
  },
  scrollViewContent: {
    paddingBottom: 100,
    flex: 1,
  },
  contentAll: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    marginLeft: 10,
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
    width: wp('91%'),
    height: hp('21%'),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
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
  bottomSpacer: {
    height: 500,
  },
});
