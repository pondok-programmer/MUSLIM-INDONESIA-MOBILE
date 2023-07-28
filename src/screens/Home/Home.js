import React, { useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { colors, dimens } from '../../utils';
import { fonts } from '../../assets';
import { GlobalContext } from '../../Store/globalContext';
import { getMoviesFromApi } from '../../services/TestConsume';

const Home = ({ navigation, route   }) => {
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
    <SafeAreaView style = { styles.container }>
        <View
            style={[
            styles.body,
            { backgroundColor : dark ? colors.black : colors.white },
            ]}>
            <Text
            style={[
                styles.text,
                {fontSize : dimens.m, color : dark ? colors.primary : colors.black},
            ]}>
            Home
            </Text>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    body : {
        height : '100%',
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : colors.white,
    },
    text : {
        fontFamily : fonts.PoppinsRegular,
        fontSize : dimens.xxl,
        color : colors.black,
    },
});

export default Home;
