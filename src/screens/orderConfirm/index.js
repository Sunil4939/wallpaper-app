import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  BackHandler,
} from 'react-native';
import {COLORS, FONTS} from './../../constants';
import styles from './styles';
import {icons, images} from './../../constants';
import OrderHistory from './../orderHistory/index';
const OrderConfirm = ({navigation}) => {
  function handleBackButtonClick() {
    navigation.navigate('OrderHistory');
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.innerContainer}>
        <Image source={images.orderdone} style={styles.mainImg} />
        <Text style={styles.thanku}>
          Thank You, Your Order Has Been Placed.
        </Text>
      </View>
    </View>
  );
};

export default OrderConfirm;
