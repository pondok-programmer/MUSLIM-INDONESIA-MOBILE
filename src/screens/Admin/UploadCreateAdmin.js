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
  ScrollView,
  Modal,
  Button,
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
import {Loader} from '../../components';
import {postAdminCreate} from '../../services/AuthCreateMasjid';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const UploadCreateAdmin = ({navigation}) => {
  const globaleContext = useContext(GlobalContext);
  const dark = globaleContext.state.isDark;
  const [loading, setLoading] = useState(false);
  const [selectedImageCamera, setSelectedImageCamera] = React.useState(null);
  const [photo, setPhoto] = useState();
  const [place_name, setPlace_name] = useState('');
  const [province, setProvince] = useState('');
  const [categories, setCategories] = useState('');
  const [description_photo, setDescription_photo] = useState('');
  const [regency, setRegency] = useState('');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [addres, setAddres] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const isMounted = useRef(true);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  // ! CREATE MASJID
  const create_All_Component = async () => {
    try {
      setLoading(true);

      if (
        !place_name ||
        !categories ||
        !description_photo ||
        !province ||
        !regency ||
        !district ||
        !village ||
        !addres ||
        !lat ||
        !long ||
        !selectedImageCamera
      ) {
        showErrorModal('Silahkan isi komponent terlebih dahulu.');
        setLoading(false);
        return;
      }

      const latDouble = parseFloat(lat);
      const longDouble = parseFloat(long);

      const formData = new FormData();
      if (selectedImageCamera) {
        formData.append('photo', {
          uri: selectedImageCamera.uri,
          type: selectedImageCamera.type,
          name: selectedImageCamera.fileName,
        });
      }
      formData.append('place_name', place_name);
      formData.append('categories', categories);
      formData.append('deskripsi_photo', description_photo);
      formData.append('province', province);
      formData.append('regency', regency);
      formData.append('district', district);
      formData.append('village', village);
      formData.append('addres', addres);
      formData.append('lat', latDouble.toString()); // Mengonversi kembali ke string jika diperlukan
      formData.append('long', longDouble.toString());

      const result = await postAdminCreate(formData);
      console.log('resul...', result);

      if (isMounted.current) {
        ToastAndroid.show('Berhasil create produck', ToastAndroid.SHORT);
        if (navigation && navigation.goBack) {
          navigation.goBack();
        }
      }
    } catch (error) {
      console.log('failed create', error);
      showErrorModal('Gagal create produck');
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleTextInputChange = (field, value) => {
    switch (field) {
      case 'place_name':
        setPlace_name(value);
        break;
      case 'categories':
        setCategories(value);
        break;
      case 'description_photo':
        setDescription_photo(value);
        break;
      case 'province':
        setProvince(value);
        break;
      case 'regency':
        setRegency(value);
        break;
      case 'district':
        setDistrict(value);
        break;
      case 'village':
        setVillage(value);
        break;
      case 'addres':
        setAddres(value);
        break;
      case 'lat':
        setLat(value);
        break;
      case 'long':
        setLong(value);
        break;
      default:
        break;
    }
  };

  // ! MODAL
  const showErrorModal = message => {
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.green} />
      <Loader visible={loading} />
      <ScrollView>
        {/* Modal Error */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={errorModalVisible}
          onRequestClose={() => {
            setErrorModalVisible(false);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.PoppinsBold,
                  marginBottom: 10,
                  fontSize: dimens.xl,
                  color: colors.black,
                }}>
                Error
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: dimens.l,
                  fontFamily: fonts.PoppinsRegular,
                }}>
                {errorMessage}
              </Text>
              <Button
                title="Tutup"
                onPress={() => {
                  setErrorModalVisible(false);
                }}
              />
            </View>
          </View>
        </Modal>

        <View style={styles.body}>
          {/* ICONS LEFT AND TEXT EDIT PROFILE */}
          <View style={styles.navbarEditProfile}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={icons.left} style={styles.imgNavbar} />
            </TouchableOpacity>
          </View>

          {/* IMG USER */}
          <View style={styles.bodyImageUser}>
            <View style={styles.bodyImageUser}>
              {selectedImageCamera ? (
                <Image
                  source={{uri: selectedImageCamera?.uri || photo}}
                  style={{
                    width: wp('36%'),
                    height: hp('17.3%'),
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
            {/* PLACE NAME */}
            <View style={styles.bodyTextinput}>
              <Text style={styles.txtTextInput}>Place name</Text>
              <TextInput
                placeholder="place name"
                selectionColor={'#000000'}
                style={styles.TextInput}
                onChangeText={val => handleTextInputChange('place_name', val)}
                value={place_name}
              />
              <View style={styles.line} />
            </View>

            {/* CATEGORIES */}
            <View style={styles.bodyTextinput}>
              <Text style={styles.txtTextInput}>Categories</Text>
              <TextInput
                placeholder="categories"
                selectionColor={'#000000'}
                style={styles.TextInput}
                onChangeText={val => handleTextInputChange('categories', val)}
                value={categories}
              />
              <View style={styles.line} />
            </View>

            {/* DESCRIPTION PHOTO */}
            <View style={styles.bodyTextinput}>
              <Text style={styles.txtTextInput}>Description photo</Text>
              <TextInput
                placeholder="description photo"
                selectionColor={'#000000'}
                style={styles.TextInput}
                onChangeText={val =>
                  handleTextInputChange('description_photo', val)
                }
                value={description_photo}
              />
              <View style={styles.line} />
            </View>

            {/* PROVINCE */}
            <View style={styles.bodyTextinput}>
              <Text style={styles.txtTextInput}>Province</Text>
              <TextInput
                placeholder="province"
                selectionColor={'#000000'}
                style={styles.TextInput}
                onChangeText={val => handleTextInputChange('province', val)}
                value={province}
              />
              <View style={styles.line} />
            </View>

            {/* REGENCY */}
            <View style={styles.bodyTextinput}>
              <Text style={styles.txtTextInput}>Regency</Text>
              <TextInput
                placeholder="regency"
                selectionColor={'#000000'}
                style={styles.TextInput}
                onChangeText={val => handleTextInputChange('regency', val)}
                value={regency}
              />
              <View style={styles.line} />
            </View>

            {/* DISTRICT */}
            <View style={styles.bodyTextinput}>
              <Text style={styles.txtTextInput}>District</Text>
              <TextInput
                placeholder="district"
                selectionColor={'#000000'}
                style={styles.TextInput}
                onChangeText={val => handleTextInputChange('district', val)}
                value={district}
              />
              <View style={styles.line} />
            </View>

            {/* VILLAGE */}
            <View style={styles.bodyTextinput}>
              <Text style={styles.txtTextInput}>Village</Text>
              <TextInput
                placeholder="village"
                selectionColor={'#000000'}
                style={styles.TextInput}
                onChangeText={val => handleTextInputChange('village', val)}
                value={village}
              />
              <View style={styles.line} />
            </View>

            {/* ADDRESS */}
            <View style={styles.bodyTextinput}>
              <Text style={styles.txtTextInput}>Address</Text>
              <TextInput
                placeholder="addres"
                selectionColor={'#000000'}
                style={styles.TextInput}
                onChangeText={val => handleTextInputChange('addres', val)}
                value={addres}
              />
              <View style={styles.line} />
            </View>

            {/* LAT */}
            <View style={styles.bodyTextinput}>
              <Text style={styles.txtTextInput}>Lat</Text>
              <TextInput
                placeholder="lat"
                selectionColor={'#000000'}
                style={styles.TextInput}
                onChangeText={val => handleTextInputChange('lat', val)}
                value={lat}
              />
              <View style={styles.line} />
            </View>

            {/* LONG*/}
            <View style={styles.bodyTextinput}>
              <Text style={styles.txtTextInput}>Long</Text>
              <TextInput
                placeholder="long"
                selectionColor={'#000000'}
                style={styles.TextInput}
                onChangeText={val => handleTextInputChange('long', val)}
                value={long}
              />
              <View style={styles.line} />
            </View>

            {/* CHNAGE PROFILE */}
            <TouchableOpacity
              style={{bottom: 13}}
              onPress={() => create_All_Component()}>
              <LinearGradient
                colors={['#40EC15', '#688F16']}
                style={styles.sumbit}>
                <Text style={styles.txtChangeProfile}>Change</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    alignItems: 'flex-start',
    marginTop: '3%',
  },
  imgNavbar: {
    height: hp('4%'),
    width: wp('8%'),
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
    height: hp('17.3%'),
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
    marginTop: '15%',
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
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

export default UploadCreateAdmin;
