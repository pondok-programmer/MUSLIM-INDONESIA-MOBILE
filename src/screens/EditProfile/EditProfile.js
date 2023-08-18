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
import {launchCamera, launchCameraAsync} from 'react-native-image-picker';
// import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
// import {PermissionsAndroid} from 'react-native';
// import * as ImagePicker from 'react-native-image-picker';

const EditProfile = ({navigation}) => {
  const globaleContext = useContext(GlobalContext);
  const dark = globaleContext.state.isDark;
  const [gambar, setGambar] = useState({
    uri: '',
    name: null,
    type: null,
  });

  // const [imageSource, setImageSource] = useState(null);

  // const selectImage = () => {
  //   const options = {
  //     title: 'Select Image',
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };

  //   ImagePicker.showImagePicker(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
  //       // Set the selected image as the source for the Image component
  //       const source = {uri: response.uri};
  //       setImageSource(source);
  //     }
  //   });
  // };
  // ! IMAGES PICKER
  // const openCamera = () => {
  //   // Minta izin kamera langsung sebelum membuka kamera
  //   request(PERMISSIONS.ANDROID.CAMERA).then(result => {
  //     if (result === RESULTS.GRANTED) {
  //       const option = {
  //         mediaType: 'photo',
  //         quality: 0.1,
  //       };
  //       launchCamera(option, res => {
  //         console.log(res);

  //         if (res.didCancel) {
  //           console.log('User Cancelled photo');
  //         } else if (res.errorCode) {
  //           console.log('Error occurred while capturing photo');
  //           console.log(res.errorMessage);
  //         } else {
  //           const data = res.assets;
  //           console.log(data);
  //         }
  //       });
  //     } else if (result === RESULTS.DENIED) {
  //       console.log('Permission denied for accessing camera');
  //     }
  //     // Anda bisa menangani hasil lainnya juga
  //   });

  // async function chooseImage() {
  //   try {
  //     const result = await launchCamera({
  //       mediaTypes: 'photo',
  //       quality: 0.1,
  //     });

  //     if (!result.cancelled) {
  //       const {uri, width, height, type} = result;
  //       setGambar({
  //         uri: uri || '',
  //         width: width || 0,
  //         height: height || 0,
  //         type: type || '',
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
        {/* <View style={styles.bodyImageUser}>
          {gambar.uri ? (
            <Image
              source={{uri: gambar.uri}}
              style={{width: wp('25%'), height: hp('15%'), borderRadius: 250}}
            />
          ) : (
            <Image source={images.user} style={styles.imgUser} />
          )}
        </View> */}
        {/* <View>
          {imageSource && (
            <Image source={imageSource} style={{width: 200, height: 200}} />
          )}
        </View> */}

        {/* VECTOR  */}
        <View style={styles.bodyInputImageGallery}>
          <TouchableOpacity
            style={styles.TochableVector}
            onPress={() => chooseImage()}>
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
    marginTop: '3%',
    justifyContent: 'center',
    alignItems: 'center',
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
    bottom: 10,
  },
});
