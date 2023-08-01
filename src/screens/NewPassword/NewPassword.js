import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {colors} from '../../utils';

const NewPassword = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>NewPassword</Text>
    </SafeAreaView>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
  },
});
