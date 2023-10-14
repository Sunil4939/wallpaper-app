import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {COLORS, FONTS} from './../../constants';
import {icons, images} from './../../constants';
import Button from './../Button/index';

const {width, height} = Dimensions.get('window');

const PriceDetail = ({
  quantityprice,
  discount,
  coupon,
  charge,
  tax,
  total,
  save,
  onpressAdd,
  headingmain,
  addmorebtn,
  quantity,
}) => {
  return (
    <View>
      {addmorebtn ? null : (
        <TouchableOpacity
          onPress={onpressAdd}
          activeOpacity={0.5}
          style={styles.addmorebox}>
          <Image source={icons.plus} style={styles.plus} />
          <Text style={styles.addmore}>Add more product</Text>
        </TouchableOpacity>
      )}

      <View style={styles.priceBox}>
        <Text style={styles.pricetitle}>{headingmain}</Text>

        <View style={styles.rowprice}>
          {quantity > 0 ? (
            <Text style={styles.pricehead}>Price ({quantity} product)</Text>
          ) : (
            <Text style={styles.pricehead}>Price</Text>
          )}
          <Text numberOfLines={1} style={styles.price}>
            ₹{quantityprice}
          </Text>
        </View>
        <View style={styles.rowprice}>
          <Text style={styles.pricehead}>Discount</Text>
          <Text numberOfLines={1} style={[styles.price, {color: COLORS.red}]}>
            -₹{discount}
          </Text>
        </View>
        <View style={styles.rowprice}>
          <Text style={styles.pricehead}>Coupon Discount</Text>
          <Text numberOfLines={1} style={styles.price}>
            ₹{coupon}
          </Text>
        </View>

        <View style={styles.rowprice}>
          <Text style={styles.pricehead}>Delivery Charge</Text>
          <Text numberOfLines={1} style={styles.price}>
            ₹{charge}
          </Text>
        </View>
        <View style={styles.rowprice}>
          <Text style={styles.pricehead}>TAX</Text>
          <Text numberOfLines={1} style={styles.price}>
            ₹{tax}
          </Text>
        </View>

        <View style={styles.rowpricetotal}>
          <Text style={styles.pricetotal}>Total Price</Text>
          <Text
            numberOfLines={1}
            style={[styles.price, {fontSize: 13, ...FONTS.sevenHundred}]}>
            ₹{total}
          </Text>
        </View>
      </View>
      {save > 0 && (
        <Text style={styles.save}>You will save ₹{save} on this order </Text>
      )}
    </View>
  );
};
export default PriceDetail;
const styles = StyleSheet.create({
  addmorebox: {
    borderWidth: 1,
    borderColor: COLORS.red,
    alignSelf: 'center',
    marginBottom: height * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.93,
    justifyContent: 'center',
    height: height * 0.056,
    borderRadius: 6,
    backgroundColor: COLORS.white,
  },
  plus: {
    height: height * 0.03,
    width: width * 0.043,
    resizeMode: 'contain',
    marginHorizontal: width * 0.02,
  },
  addmore: {
    fontSize: 13,
    color: COLORS.red,
    fontFamily: FONTS.semiBold,
    marginBottom: -3,
  },
  priceBox: {
    borderWidth: 1,
    borderColor: COLORS.gray10,
    alignSelf: 'center',
    marginBottom: height * 0.02,
    width: width * 0.93,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    elevation: 1,
  },
  rowprice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.011,
    alignSelf: 'center',
    width: width * 0.85,
  },
  pricetitle: {
    fontSize: 14,
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
    borderBottomWidth: 1,
    borderColor: COLORS.gray10,
    paddingLeft: width * 0.025,
    paddingTop: height * 0.015,
    paddingBottom: height * 0.005,
  },
  pricehead: {
    width: width * 0.65,
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONTS.medium,
  },
  price: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONTS.medium,
    width: width * 0.2,
  },
  rowpricetotal: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.012,
    borderTopWidth: 1,
    borderColor: COLORS.gray10,
  },

  pricetotal: {
    width: width * 0.65,
    fontSize: 13,
    ...FONTS.sevenHundred,
    color: COLORS.black,
    marginLeft: width * 0.03,
  },

  save: {
    fontSize: 13,
    ...FONTS.sixHundred,
    color: COLORS.red,
    marginLeft: width * 0.02,
    marginBottom: height * 0.01,
  },
});
