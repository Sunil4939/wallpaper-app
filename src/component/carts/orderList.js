import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {COLORS, FONTS, data, icons, images} from '../../constants';
const {width, height} = Dimensions.get('window');

const OrderList = ({
  image,
  orderid,
  onPress,
  heading,
  qty,
  deliverydate,
  price,
  status,
  disabled,
  navigation,
  mrp,
  moreproductcount,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.box}>
      <View>
        <Image
          source={image}
          style={[
            styles.tabimg,
            moreproductcount
              ? {height: height * 0.12}
              : {height: height * 0.137},
          ]}
        />
        {moreproductcount > 0 && (
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.moreproduct}>
              +{moreproductcount} more Product
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text style={styles.orderid}>Order Id : {orderid}</Text>
        <Text numberOfLines={2} style={styles.heading}>{heading}</Text>
        <View style={styles.row}>
          <Text style={styles.qty}>Qty:{qty}</Text>

          <Text numberOfLines={1} style={styles.mrp}>
            MRP{' '}
          </Text>
          <Text numberOfLines={1} style={styles.mrpprice}>
            ₹{mrp}
          </Text>
          {/* <View style={styles.borderright}></View> */}
          {/* <Text style={styles.qty}>Delivery at :</Text>
          <Text style={styles.greentext}>{deliverydate} </Text> */}
        </View>
        <Text style={styles.rupee}>₹{price}</Text>

        <Text
          style={[
            styles.greentext,
            status == 'PENDING' && {color: '#f7a560'},
            status == 'CANCELLED' && {color: COLORS.red},
          ]}>
          Status: {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.gray10,
    paddingVertical: height * 0.015,
    marginVertical: height * 0.008,
  },
  row: {
    flexDirection: 'row',
    marginTop: height * 0.003,
  },
  tabimg: {
    width: width * 0.28,
    height: height * 0.12,
    resizeMode: 'cover',
    marginRight: width * 0.03,
    marginLeft: height * 0.01,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreproduct: {
    color: COLORS.red,
    fontSize: width * 0.028,
    ...FONTS.sixHundred,
    marginLeft: height * 0.01,
    textDecorationLine: 'underline',
    textAlign: 'center',
    width: width * 0.28,
    marginTop: height * 0.003,
  },
  orderid: {
    color: COLORS.gray70,
    fontSize: width * 0.027,
    ...FONTS.fiveHundred,
    width: width * 0.6,
    marginBottom: -4,
  },
  borderright: {
    borderRightWidth: 1,
    borderColor: COLORS.black,
    height: height * 0.018,
    marginTop: 2,
    marginHorizontal: width * 0.02,
  },
  qty: {
    color: COLORS.gray80,
    fontSize: 13,
    ...FONTS.fiveHundred,
  },
  greentext: {
    color: COLORS.green,
    fontSize: 13,
    ...FONTS.sixHundred,
  },
  heading: {
    color: COLORS.black,
    fontSize: width * 0.034,
    lineHeight: width * 0.042,
    ...FONTS.sixHundred,
    height: height * 0.046,
    width: width * 0.6,
    marginTop: 3,
  },
  rupee: {
    color: COLORS.black,
    fontSize: 14,
    ...FONTS.sixHundred,
  },
  mrp: {
    color: COLORS.gray90,
    fontSize: 12,
    ...FONTS.fiveHundred,
    marginBottom: -3,
    marginLeft: width * 0.05,
  },
  mrpprice: {
    color: COLORS.gray90,
    fontSize: 12,
    ...FONTS.fiveHundred,
    textDecorationLine: 'line-through',
    marginBottom: -2.5,
  },
});
