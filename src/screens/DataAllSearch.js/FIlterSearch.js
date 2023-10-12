import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../utils';

const FilterSearch = ({onSearch, navigation, onChangeText, value}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleSearch = () => {
    onSearch(searchTerm);
    setShowInput(true);
  };

  return (
    <View style={styles.container}>
      {/* ICON LEFT */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        {/* Icon Kembali */}
        <Icon name="arrow-left" size={40} color="#000" />
      </TouchableOpacity>

      {/* TEXTINPUT */}
      <View style={styles.bodyTextinput}>
        <TextInput
          style={styles.input}
          placeholder="silahkan mencari masjid, restoran & tpq"
          placeholderTextColor={colors.black}
          value={value}
          onChangeText={onChangeText}
          autoFocus
          onSubmitEditing={handleSearch}
          onBlur={() => setShowInput(false)}
        />
        {/* <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon
            name={'magnify'}
            size={34}
            color={colors.black}
            style={{marginHorizontal: 10, marginTop: '1%', right: 10}}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default FilterSearch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  bodyTextinput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: 10,
    borderRadius: 7,
    width: '80%',
  },
  backButton: {
    zIndex: 1,
    marginRight: 10,
  },
  input: {
    fontSize: hp('2%'),
    color: colors.black,
  },
  searchButton: {
    marginLeft: 10,
  },
  clearButton: {
    marginLeft: 10,
  },
});
