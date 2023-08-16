import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {fonts} from '../assets';
import {colors} from '../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const width = Dimensions.get('window').width;

const ButtonCustom = ({
  title = 'Button',
  onPress,
  color = colors.primary,
  buttonStyle,
}) => {
  return (
    <TouchableOpacity
      style={[buttonStyle, styles.button, {backgroundColor: color}]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: '80%',
    marginRight: 25,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 5,
  },
  text: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.white,
  },
});
export default ButtonCustom;
