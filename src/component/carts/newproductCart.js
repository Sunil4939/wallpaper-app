import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS } from './../../constants';
import { icons, images } from './../../constants';
import Button from './../Button/index';
import {
  CreateWishlistApi,
  DeleteWishlistApi,
  GetWishlistByUserIdApi,
} from './../../redux/actions/wishlistAction';
import { connect } from 'react-redux';
import { AddTOCartApi } from './../../redux/actions/cartAction';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const NewProductCart = ({
  image,
  title,
  gst, dummyaddCartData,
  subtitle,
  price,
  mrp,
  rate,
  ratings,
  onPressimg,
  off,
  marginleft,
  AddTOCartApi,
  btnStyle, token,
  CreateWishlistApi,
  DeleteWishlistApi,
  getuser,
  id,
  getwishlistbyuserid,
  GetWishlistByUserIdApi,
  getcartbyuserid,
}) => {
  const [condition, setCondition] = useState(false);
  const [valid, setValid] = useState(false)
  const navigation = useNavigation()

  // const valid = getcartbyuserid?.data?.some(o => o?.productId?._id === id);

  useEffect(() => {
    if (getwishlistbyuserid && getwishlistbyuserid?.[0]) {
      if (getwishlistbyuserid?.some(i => i?.productId?._id === id)) {
        setCondition(true);
      } else {
        setCondition(false);
      }
    } else {
      setCondition(false);
    }
  }, [getwishlistbyuserid]);

  const handleChange = () => {
    if (condition) {
      DeleteWishlistApi(id);
      setCondition(false);
    } else {
      CreateWishlistApi(id);
      setCondition(true);
    }
  };

  useEffect(() => {
    if (getcartbyuserid?.data?.[0]) {
      if (getcartbyuserid?.data?.some(o => o?.productId?._id === id)) {
        setValid(true)
      } else {
        setValid(false)
      }
    } else {
      setValid(false)
    }
  }, [getcartbyuserid])

  return (
    <TouchableOpacity activeOpacity={0.5} style={[styles.main_Box, marginleft]}
      onPress={onPressimg}>
      {getuser?._id == null ? (
        ''
      ) : (
        <TouchableOpacity
          activeOpacity={0.3}
          style={styles.heartbox}
          onPress={handleChange}>
          {condition ? (
            <Image
              source={icons.heart}
              style={[styles.heart, { tintColor: COLORS.primary }]}
            />
          ) : (
            <Image source={icons.heart} style={[styles.heart]} />
          )}
        </TouchableOpacity>
      )}

      <View
        style={styles.imagebox}
      >
        <Image source={image} style={styles.image} />
      </View>

      <View
        style={styles.bottomBox}>
        <Text numberOfLines={2} style={styles.heading}>
          {title}
        </Text>
        <Text numberOfLines={2} style={styles.subtitle}>
          {subtitle}
        </Text>
        <View style={styles.row}>
          <View style={styles.ratebox}>
            <Text style={styles.rate}>{rate} </Text>
            <Image source={icons.fillstar} style={styles.star} />
          </View>
          <Text style={styles.ratings}>{ratings} ratings</Text>
        </View>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.mrp}>
            MRP
          </Text>
          <Text numberOfLines={1} style={styles.mrpprice}>
            ₹{mrp}
          </Text>
          {off == 0 ? (
            <Text numberOfLines={1} style={styles.off}></Text>
          ) : (
            <Text numberOfLines={1} style={styles.off}>
              {off}%OFF
            </Text>
          )}
          <Text numberOfLines={1} style={styles.price}>
            ₹{price}
          </Text>
        </View>
      </View>
      <View style={{ marginBottom: height * 0.01 }}>
        {valid ? (
          <Button
            children="View to cart"
            aadtocartBtn
            btnStyle={{ backgroundColor: COLORS.red }}
            onPress={() => navigation?.navigate('Cart')}
          />
        ) : (
          <Button
            children="Add to cart"
            aadtocartBtn
            btnStyle={btnStyle}
            onPress={() => AddTOCartApi(id, {
              userId: token && getuser?._id ? getuser?._id : (dummyaddCartData ? dummyaddCartData : ''),
              type: 'ADDTOCART',
            })}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  token: state?.auth?.token,
  getuser: state?.auth?.getuser,
  getwishlistbyuserid: state?.wishlist?.getwishlistbyuserid,
  getcartbyuserid: state.cart.getcartbyuserid,
  dummyaddCartData: state.cart.dummyaddCartData,
});

const mapDispatchToProps = {
  CreateWishlistApi,
  DeleteWishlistApi,
  GetWishlistByUserIdApi,
  AddTOCartApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProductCart);

const styles = StyleSheet.create({
  main_Box: {
    width: width * 0.47,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginRight: width * 0.015,
    elevation: 3,
    marginBottom: height * 0.015,
  },
  imagebox: {
    width: width * 0.3,
    height: height * 0.15,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: height * 0.01,
    marginRight: width * 0.03,
  },
  image: {
    width: width * 0.3,
    height: height * 0.15,
    resizeMode: 'contain',
    borderRadius: 8,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.004,
  },
  bottomBox: {
    paddingHorizontal: width * 0.02,
  },
  heading: {
    color: COLORS.black,
    fontSize: 12,
    width: width * 0.41,
    ...FONTS.sixHundred,
    height: height * 0.045,
  },
  ratings: {
    color: COLORS.black,
    fontSize: 11,
    width: width * 0.2,
    ...FONTS.fiveHundred,
  },
  ratebox: {
    width: width * 0.12,
    backgroundColor: COLORS.red,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: width * 0.003,
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: width * 0.02,
  },
  rate: {
    color: COLORS.white,
    fontSize: 12,
    ...FONTS.fiveHundred,
    marginBottom: -3,
    marginRight: width * 0.015,
  },
  star: {
    width: width * 0.028,
    height: height * 0.014,
    resizeMode: 'stretch',
    tintColor: COLORS.white,
  },
  heartbox: {
    width: width * 0.08,
    height: height * 0.04,
    resizeMode: 'contain',
    position: 'absolute',
    right: 5,
    top: 5,
    alignItems: 'center',
  },
  heart: {
    width: width * 0.05,
    height: height * 0.04,
    resizeMode: 'contain',
  },
  subtitle: {
    color: COLORS.black,
    fontSize: 11,
    ...FONTS.fiveHundred,
    width: width * 0.41,
    height: height * 0.044,
  },
  mrp: {
    color: COLORS.gray70,
    fontSize: 9.7,
    ...FONTS.fiveHundred,
    marginBottom: -3,
  },
  mrpprice: {
    color: COLORS.gray70,
    fontSize: 9.5,
    ...FONTS.fiveHundred,
    width: width * 0.1,
    textDecorationLine: 'line-through',
    marginBottom: -2.5,
  },
  off: {
    color: COLORS.red,
    fontSize: 9.3,
    ...FONTS.sixHundred,
    width: width * 0.15,
    marginBottom: -3,
  },
  price: {
    color: COLORS.black,
    fontSize: 11,
    ...FONTS.sixHundred,
    width: width * 0.12,
    marginBottom: -3,
  },
});
