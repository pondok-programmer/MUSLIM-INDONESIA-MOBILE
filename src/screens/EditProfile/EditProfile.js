import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, dimens} from '../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useContext} from 'react';
import {GlobalContext} from '../../Store/globalContext';
import {fonts, icons, images} from '../../assets';

const EditProfile = () => {
  const globaleContext = useContext(GlobalContext);
  const dark = globaleContext.state.isDark;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.green} />
      <View style={styles.body}>
        <View
          style={{
            marginTop: '10%',
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Image
              source={images.user}
              style={{height: hp('11%'), width: wp('23%')}}
            />
          </TouchableOpacity>
          <Text style={styles.TxtTitle}>Edit Profile</Text>
        </View>

        {/* CONTENT PROFILE */}
        <View
          style={[
            styles.ContentProfile,
            {
              backgroundColor: dark ? colors.black : colors.white,
            },
          ]}></View>
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
  TxtTitle: {
    fontFamily: fonts.PoppinsMedium,
    paddingTop: 10,
  },
  ContentProfile: {
    backgroundColor: colors.white,
    height: hp('100%'),
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: '80%',
  },

  line: {
    borderWidth: 0.4,
    borderRadius: 10,
    width: wp('75%'),
    top: '13%',
    marginLeft: 10,
  },
});
