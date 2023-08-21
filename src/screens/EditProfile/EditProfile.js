import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Button,
  Dimensions,
} from 'react-native';
import {colors, dimens} from '../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useContext} from 'react';
import {GlobalContext} from '../../Store/globalContext';
import {fonts, icons, images} from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const EditProfile = ({navigation}) => {
  const globaleContext = useContext(GlobalContext);
  const dark = globaleContext.state.isDark;
  const [imageCamera, setImageCamera] = React.useState(null);

  const [gambar, setGambar] = useState({
    uri: '',
    name: null,
    type: null,
  });

  // ! IMAGES PICKER
  // {' CAMERA'}
  const openCamera = () => {
    launchImageLibrary(
      {
        mediaType: 'photo', // 'Images' should be changed to 'photo'
        quality: 0.1,
      },
      result => {
        setImageCamera(result.uri);
        console.log(result.uri);
      },
    );
  };

  // {' GALERLY'}
  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.1,
      },
      result => {
        console.log(result);
      },
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.green} />
      <View style={styles.body}>
        {/* ICONS LEFT AND TEXT EDIT PROFILE */}
        <View style={styles.navbarEditProfile}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.left} style={styles.imgNavbar} />
          </TouchableOpacity>
          <Text style={styles.txtNavbar}>Edit Profile</Text>
        </View>

        <View style={styles.bodyTextDes}>
          <Text style={styles.txtDes}>
            Silahkan merubah data pribadi anda, pastikan data yang anda berikan
            tervalidasi dengan baik
          </Text>
          <Text style={styles.star}>*</Text>
        </View>

        {/* IMG USER */}
        <View style={styles.bodyImageUser}>
          <View style={styles.bodyImageUser}>
            {gambar.uri ? (
              <Image
                source={{uri: gambar.uri}}
                style={{
                  width: wp('33%'),
                  height: hp('15%'),
                  borderRadius: 200,
                }}
              />
            ) : (
              <Image source={images.user} style={styles.imgUser} />
            )}
          </View>
        </View>

        {/* VECTOR TAKE CAMERA & GALERLY  */}
        <View style={styles.bodyInputImageGallery}>
          <TouchableOpacity
            style={styles.TochableVector}
            onPress={() => openCamera()}>
            <Image source={icons.VectorTambah} style={styles.imgVector} />
          </TouchableOpacity>
        </View>

        {/* CONTENT PROFILE */}
        <View
          style={[
            styles.ContentProfile,
            {
              backgroundColor: dark ? colors.black : colors.white,
            },
          ]}>
          {/* TEXTINPUT USERNAME */}
          <View style={styles.bodyTextinput}>
            <Text style={styles.txtTextInput}>Nama</Text>
            <TextInput
              placeholder="Username"
              selectionColor={'#121212'}
              style={styles.TextInput}
            />
            <View style={styles.line} />
          </View>
          {/* TEXTINPUT LOCATION */}
          <View style={styles.bodyTextinput}>
            <Text style={styles.txtTextInput}>Location</Text>
            <TextInput
              placeholder="Location"
              selectionColor={'#121212'}
              style={styles.TextInput}
            />
            <View style={styles.line} />
          </View>
          {/* TEXTINPUT EMAIL */}
          <View style={styles.bodyTextinput}>
            <Text style={styles.txtTextInput}>Email</Text>
            <TextInput
              placeholder="Email"
              selectionColor={'#121212'}
              style={styles.TextInput}
            />
            <View style={styles.line} />
          </View>

          {/* LOGIN */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LinearGradient
              colors={['#40EC15', '#688F16']}
              style={styles.sumbit}>
              <Text style={styles.txtChangeProfile}>Change</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
  },
  body: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.green,
  },
  navbarEditProfile: {
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
  },
  imgNavbar: {
    height: hp('4%'),
    width: wp('8%'),
  },
  txtNavbar: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: dimens.xl,
    paddingLeft: 7,
    color: colors.white,
    marginLeft: '29%',
  },
  bodyTextDes: {
    alignItems: 'center',
    marginTop: '7%',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  star: {
    color: colors.red,
    bottom: 14,
  },
  txtDes: {
    textAlign: 'left',
    width: wp('90%'),
    color: colors.white,
    fontFamily: fonts.PoppinsRegular,
  },
  bodyImageUser: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
    height: height / 6,
    width: width / 2,
    marginHorizontal: 100,
    // backgroundColor: colors.blue,
  },
  imgUser: {
    height: hp('17%'),
    width: wp('36%'),
  },
  bodyInputImageGallery: {
    alignItems: 'center',
    marginLeft: '23%',
  },
  TochableVector: {
    bottom: '58%',
  },
  imgVector: {
    height: hp('8%'),
    width: wp('30%'),
  },
  bodyTextinput: {
    marginTop: '10%',
    marginHorizontal: 20,
  },

  txtTextInput: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    fontSize: dimens.xl,
  },
  TextInput: {
    color: colors.black,
  },
  line: {
    borderWidth: 0.9,
    borderRadius: 10,
    width: wp('90%'),
  },
  sumbit: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 20,
    height: hp('8%'),
    width: wp('86%'),
    marginTop: '8%',
  },
  txtChangeProfile: {
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.white,
    fontSize: dimens.xxl,
  },
  TxtTitle: {
    fontFamily: fonts.PoppinsMedium,
    paddingTop: 10,
    fontSize: dimens.l,
    color: colors.black,
  },
  ContentProfile: {
    backgroundColor: colors.white,
    height: hp('100%'),
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    bottom: '2%',
  },
});
