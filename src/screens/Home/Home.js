import React, {useContext, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts} from '../../assets';
import {GlobalContext} from '../../Store/globalContext';
import {getMoviesFromApi} from '../../services/TestConsume';

const Home = ({navigation, route}) => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;

  const getData = async () => {
    const result = await getMoviesFromApi();
    console.log('result...', result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={dark ? colors.black : colors.green}
      />
      <View
        style={[
          styles.body,
          {backgroundColor: dark ? colors.black : colors.green},
        ]}>
        <Text
          style={[
            styles.text,
            {fontSize: dimens.m, color: dark ? colors.primary : colors.black},
          ]}>
          Home
        </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
  },
  text: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: dimens.xxl,
    color: colors.black,
  },
});

export default Home;
