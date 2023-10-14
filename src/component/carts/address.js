import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS, icons} from '../../constants';
const {height, width} = Dimensions.get('window');

const AddressCart = ({
  onPress,
  firstname,
  address,
  area,
  state,
  country,
  city,
  landmark,
  pincode,
  checked,
  onPressaddress,
  mobile,
  onPressedit,
  onPressdelete,
}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={styles.box1}>
        <TouchableOpacity style={styles.pyment_radio_box}>
          {checked && <View style={styles.pyment_innerradio_box}></View>}
        </TouchableOpacity>
        <View
          style={{
            width: width * 0.74,
            marginLeft: width * 0.025,
          }}>
          <View style={styles.rowtext}>
            <Text style={styles.Deliver}>Deliver to: {''}</Text>
            <Text numberOfLines={1} style={styles.text1}>
              {firstname}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.text1}>
            {mobile}
          </Text>
          <Text numberOfLines={2} style={styles.text3}>
            {address}
            {', '}
            {area}
            {', '}
            {city}
            {', '}
            {landmark}
            {', '}
            {country}
            {', '}
            {state}
            {', '}
            {pincode}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={onPressdelete} style={styles.editbox}>
            <Image source={icons.deleteicon} style={styles.img3} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressedit} style={styles.deletebox}>
            <Image source={icons.edit} style={styles.img3} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddressCart;

const styles = StyleSheet.create({
  box1: {
    flexDirection: 'row',
    marginVertical: width * 0.02,
    alignSelf: 'center',
    width: width * 0.93,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: width * 0.025,
  },
  rowtext: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Deliver: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  text1: {
    fontSize: 12.5,
    fontFamily: FONTS.medium,
    color: COLORS.black,
    width: width * 0.56,
  },

  text3: {
    fontSize: 11.5,
    fontFamily: FONTS.regular,
    color: COLORS.gray80,
    width: width * 0.7,
    height:height * 0.04,
    // borderWidth:1,
  },
  editbox: {
    height: height * 0.038,
    width: width * 0.088,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.045,
    borderTopRightRadius: 12,
    backgroundColor: COLORS.gray10,
    borderBottomLeftRadius: 12,
  },
  deletebox: {
    height: height * 0.038,
    width: width * 0.088,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 12,
    backgroundColor: COLORS.gray10,
    borderTopLeftRadius: 12,
  },
  img3: {
    height: height * 0.02,
    width: width * 0.06,
    resizeMode: 'contain',
    tintColor: COLORS.gray80,
  },
  pyment_radio_box: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.primary,
    width: width * 0.05,
    height: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pyment_innerradio_box: {
    borderRadius: 10,
    width: width * 0.032,
    height: width * 0.032,
    // alignSelf: 'center',
    // margin: width * 0.004,
    backgroundColor: COLORS.primary,
  },
});
