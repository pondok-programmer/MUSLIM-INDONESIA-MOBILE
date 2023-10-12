import React, {useEffect, useState, useRef} from 'react';
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
  Dimensions,
  ToastAndroid,
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
import {editProfile} from '../../services/AuthEditProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserUpdate} from './UserUpdate';
import {Loader} from '../../components';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const EditProfile = ({navigation}) => {
  const {user, updateUser} = UserUpdate(); // Gunakan useUser untuk mengakses data pengguna
  const globaleContext = useContext(GlobalContext);
  const dark = globaleContext.state.isDark;
  const [selectedImageCamera, setSelectedImageCamera] = React.useState(null);
  const [full_name, setFull_name] = useState(user?.full_name || '');
  const [photo, setPhoto] = useState();
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  // ! IMAGES PICKER
  // {' CAMERA'}
  // const openCamera = () => {
  //   launchImageLibrary(
  //     {
  //       mediaType: 'photo', // 'Images' should be changed to 'photo'
  //       quality: 0.1,
  //     },
  //     result => {
  //       setImageCamera(result.uri);
  //       console.log(result.uri);
  //     },
  //   );
  // };

  // // {' GALERLY'}
  // const openGallery = () => {
  //   launchImageLibrary(
  //     {
  //       mediaType: 'photo',
  //       quality: 0.1,
  //     },
  //     result => {
  //       console.log(result);
  //     },
  //   );

  // ! YANG TERBARU
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('Pemilihan foto dibatalkan');
      } else if (response.errorCode) {
        console.log('ImagePicker error...', response.errorMessage);
      } else {
        const data = response.assets[0];
        setSelectedImageCamera(data);
        setPhoto(data.uri);
        console.log(data.uri);
        console.log(data);
        console.log('Berhasil mengambil camera');
      }
    });
  };
  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Pemilihan gambar gallery dibatalkan');
      } else if (response.errorCode) {
        console.log('ImagePicker error...', response.errorMessage);
      } else {
        const data = response.assets[0];
        setSelectedImageCamera(data);
        console.log('dari data', data);
        setPhoto(data.uri);
        console.log('mengambil dari gallery', data.uri);
      }
    });
  };

  // ? Function to open the image picker options
  const openImagePickerOptions = () => {
    Alert.alert(
      'Pilih sumber gambar',
      'Pilih sumber gambar dari :',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Galery',
          onPress: () => openGallery('gallery'),
        },
        {
          text: 'Kamera',
          onPress: () => openCamera('capture'),
        },
      ],
      {cancelable: true},
    );
  };

  // ! POST EDIT PROFILE
  const editProfileUser = async () => {
    try {
      setLoading(true);
      const username = await AsyncStorage.getItem('username');
      console.log(username);
      if (!username) {
        console.log('Username tidak tersedia');
        return;
      }

      const formData = new FormData();
      if (selectedImageCamera) {
        formData.append('photo', {
          uri: selectedImageCamera.uri,
          type: selectedImageCamera.type,
          name: selectedImageCamera.fileName,
        });
      }
      formData.append('full_name', full_name);

      const result = await editProfile(formData, username);

      if (isMounted.current) {
        if (result.id) {
          updateUser({
            photo: selectedImageCamera?.uri || user?.photo,
            full_name,
          });

          ToastAndroid.show(
            'Berhasil mengedit data profil',
            ToastAndroid.SHORT,
          );
          navigation.goBack();
        } else {
          console.log('Gagal mengedit data', result.message);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log('Error editing profile', error);
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.green} />
      <Loader visible={loading} />
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
            {selectedImageCamera ? (
              <Image
                source={{uri: selectedImageCamera?.uri || photo}}
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
            onPress={() => openImagePickerOptions()}>
            <Image source={icons.VectorTambah} style={styles.imgVector} />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.ContentProfile,
            {
              backgroundColor: dark ? colors.black : colors.white,
              flex: 1,
            },
          ]}>
          {/* FULL NAME */}
          <View style={styles.bodyTextinput}>
            <Text style={styles.txtTextInput}>Full name</Text>
            <TextInput
              placeholder="full name"
              selectionColor={'#000000'}
              style={styles.TextInput}
              onChangeText={val => setFull_name(val)}
            />
            <View style={styles.line} />
          </View>

          {/* CHNAGE PROFILE */}
          <TouchableOpacity onPress={() => editProfileUser()}>
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
  },
});

export default EditProfile;
