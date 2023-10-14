import React, {useState} from 'react';
import {Text, View, Image, Dimensions, StyleSheet} from 'react-native';
import {COLORS, FONTS, data, icons, images} from '../../constants';
import Button from './../Button/index';
const {width, height} = Dimensions.get('window');

const LoginBox = ({onPress , modalstyle}) => {
  return (
    <View style={[styles.mainbox, modalstyle]}>
      <Image source={images.login} style={styles.image} />

      <Button children="Login" mediumbtn onPress={onPress} />
    </View>
  );
};

export default LoginBox;
const styles = StyleSheet.create({
  mainbox: {
    width: width * 0.7,
    elevation: 4,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    marginTop: height * 0.2,
    marginBottom: height * 0.02
  },
  image: {
    width: width * 0.5,
    height: height * 0.25,
    resizeMode: 'cover',
    marginBottom: height * 0.02,
  },
});
