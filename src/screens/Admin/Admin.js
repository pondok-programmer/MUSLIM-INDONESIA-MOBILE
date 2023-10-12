import React from 'react';
import {useContext} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {GlobalContext} from '../../Store/globalContext';
import {colors, dimens} from '../../utils';
import {fonts, icons, images} from '../../assets';
import {
  TPQSVG,
  MasjidSVG,
  FastFood,
  QuranAppSVG,
  BeritaSVG,
  UserSVG,
  Ellipse,
} from '../AssetsSVg';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Admin = ({navigation}) => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={dark ? colors.black : colors.green}
      />

      {/*ALL BODY*/}
      <View
        style={[
          styles.body,
          {backgroundColor: dark ? colors.black : colors.green},
        ]}>
        <View style={styles.bodyimgAndTxtUser}>
          <TouchableOpacity>
            <Ellipse height={90} width={75} />
          </TouchableOpacity>
          <Text
            style={[
              styles.txtAdmin,
              {
                fontSize: dimens.l,
                color: dark ? colors.white : colors.secondary,
              },
            ]}>
            Hi,Admin
          </Text>
        </View>

        {/* KAROUSEL ADMIN */}
        <View style={styles.contentALL}>
          <LinearGradient
            colors={['#40EC15', '#688F16']}
            style={styles.contentCarosel}>
            <View style={{flexDirection: 'row'}}>
              <Ellipse height={100} width={120} />
              <View style={styles.contentCard}>
                <Text style={styles.bodyTextTitle}>ADMIN</Text>
                <Text style={styles.bodyTextChild}>27,Mey,2020</Text>
                <Text style={styles.bodyTextChild}>Mobole Developer</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bodyBottom}>
              <View style={styles.bottomView}>
                <Text style={styles.txtDate}>View Profile</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>

          {/* BOX FILE */}
          <View style={styles.viewContent}>
            <TouchableOpacity
              style={styles.boxTpq}
              onPress={() => navigation.navigate('Upload Masjid')}>
              <MasjidSVG height={60} width={70} />
              <Text style={styles.txtDasboard}>Upload All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxTpq}
              onPress={() => navigation.navigate('Upload Berita kajian')}>
              <BeritaSVG height={60} width={70} />
              <Text style={styles.txtDasboard}>Berita kajian</Text>
            </TouchableOpacity>
          </View>

          {/* BOX FILE */}
          <View style={styles.viewContent}>
            <TouchableOpacity
              style={styles.boxTpq}
              onPress={() => navigation.navigate('Upload Kajian')}>
              <QuranAppSVG height={60} width={70} />
              <Text style={styles.txtDasboard}>Upload Kajian</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxTpq}
              onPress={() => navigation.navigate('Profile Admin')}>
              <UserSVG height={60} width={70} />
              <Text style={styles.txtDasboard}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    height: '100%',
    width: '100%',
  },
  imgUser: {
    height: '104%',
    width: '19%',
  },
  bodyimgAndTxtUser: {
    flexDirection: 'row',
    marginHorizontal: 10,
    height: height / 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  txtAdmin: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.grey,
    fontSize: dimens.l,
    textAlign: 'left',
    marginLeft: '3%',
  },
  imgSetting: {
    height: '23%',
    width: '10%',
  },
  contentALL: {
    backgroundColor: colors.white,
    height: height * 2,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginVertical: 10,
  },
  contentCarosel: {
    height: 180,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 25,
    marginTop: 50,
    elevation: 10,
  },
  imgCarosel: {
    height: hp('12%'),
    width: wp('25%'),
  },
  contentCard: {
    padding: 10,
  },
  bodyTextTitle: {
    fontSize: dimens.xl,
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
  },
  bodyTextChild: {
    fontSize: dimens.s,
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    textAlign: 'justify',
    textAlignVertical: 'auto',
    width: wp('48%'),
  },
  bodyBottom: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: width * 0.8,
    marginTop: 10,
  },
  bottomView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.yellow,
    height: hp('5%'),
    width: wp('30%'),
    borderRadius: 30,
  },
  viewCalendar: {
    height: hp('3%'),
    width: wp('5%'),
    marginRight: 13,
  },
  txtDate: {
    color: colors.black,
    fontFamily: dimens.PoppinsMedium,
  },
  contentBody: {
    height: height / 8,
    marginTop: 80,
    justifyContent: 'center',
  },
  viewContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: height / 8,
    marginTop: 60,
    alignItems: 'center',
  },
  boxTpq: {
    backgroundColor: colors.white,
    width: '26%',
    height: '107%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
    elevation: 13,
  },
  txtDasboard: {
    color: colors.black,
    fontSize: dimens.s,
    fontFamily: fonts.PoppinsRegular,
  },
});
