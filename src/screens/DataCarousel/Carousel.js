import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Home} from '../Home';

const Carousel = () => {
  const dataCarousel = [
    {
      img: require('../../assets/images/kiayEen.png'),
    },
    {
      img: require('../../assets/images/kiayEen.png'),
    },
    {
      img: require('../../assets/images/kiayEen.png'),
    },
  ];
  return (
    <View>
      <Home dataCarousel={dataCarousel} />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
