import React, {useState, useEffect} from 'react';
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
import {
  CreateWishlistApi,
  DeleteWishlistApi,
  GetWishlistByUserIdApi,
} from './../../redux/actions/wishlistAction';
import {GetCartByUserIdApi} from './../../redux/actions/cartAction';
import {connect} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const BodyCareCart = ({
  image,
  title,
  subtitle,
  price,
  mrpprice,
  rate,
  ratings,
  onPressimg,
  off,
  marginleft,
  onPresscart,
  onPressbuy,
  btnStyle,
  onPressdecrement,
  onPressincrement,
  showincre,
  heartactive,
  onPressremove,
  incredecre,
  id,
  getwishlistbyuserid,
  getcartbyuserid,
  GetCartByUserIdApi,
  CreateWishlistApi,
  DeleteWishlistApi,
  getuser,
  disabled,
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
    <View style={[styles.main_Box, marginleft]}>
      <View>
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.imagebox,
            showincre && {
              width: width * 0.27,
              height: height * 0.12,
              marginBottom: height * 0.01,
            },
          ]}
          onPress={onPressimg}
          activeOpacity={0.5}>
          <Image
            source={image}
            style={[
              styles.image,
              showincre && {
                width: width * 0.27,
                height: height * 0.12,
              },
            ]}
          />
        </TouchableOpacity>
        {showincre && (
          <View style={styles.increbox}>
            <TouchableOpacity activeOpacity={0.6} onPress={onPressdecrement}>
              <Text
                style={[
                  styles.incredecretext,
                  {fontSize: 17, marginBottom: -5},
                ]}>
                -
              </Text>
            </TouchableOpacity>
            <Text style={styles.incredecretext}>{incredecre}</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={onPressincrement}>
              <Text style={[styles.incredecretext, {fontSize: 17}]}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.bottomBox}>
        {getuser?._id == null ? null : (
          <TouchableOpacity style={styles.heartbox} onPress={handleChange}>
            {condition ? (
              <Image
                source={icons.heart}
                style={[styles.heart, {tintColor: COLORS.primary}]}
              />
            ) : (
              <Image source={icons.heart} style={styles.heart} />
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{width: width * 0.52}}
          activeOpacity={0.5}
          disabled={disabled}
          onPress={onPressimg}>
          <Text numberOfLines={2} style={styles.heading}>
            {title}
          </Text>
          <Text numberOfLines={2} style={styles.subtitle}>
            {subtitle}
          </Text>
          {showincre ? null : (
            <View style={styles.row}>
              <View style={styles.ratebox}>
                <Text style={styles.rate}>{rate} </Text>
                <Image source={icons.fillstar} style={styles.star} />
              </View>
              <Text style={styles.ratings}>{ratings} ratings</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.price}>
              ₹{price}
            </Text>
            <Text numberOfLines={1} style={styles.mrp}>
              MRP
            </Text>
            <Text numberOfLines={1} style={styles.mrpprice}>
              ₹{mrpprice}
            </Text>

            {off == 0 ? null : (
              <Text numberOfLines={1} style={styles.off}>
                {off} % OFF
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          {showincre ? (
            <Button
              children="Remove"
              iconbtn
              btnStyle={{marginRight: width * 0.02}}
              onPress={onPressremove}
            />
          ) : (
            <View>
              {valid ? (
                <Button
                  children="View cart"
                  iconbtn
                  btnStyle={{marginRight: width * 0.02}}
                  onPress={() => navigation?.navigate('Cart')}
                />
              ) : (
                <Button
                  children="Add to cart"
                  iconbtn
                  iconbtnICON
                  btnStyle={{marginRight: width * 0.02}}
                  onPress={onPresscart}
                />
              )}
            </View>
          )}

          <Button
            children="Buy now"
            iconbtn
            btnStyle={btnStyle}
            onPress={onPressbuy}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  getuser: state?.auth?.getuser,
  getwishlistbyuserid: state?.wishlist?.getwishlistbyuserid,
  getcartbyuserid: state.cart.getcartbyuserid,
});

const mapDispatchToProps = {
  CreateWishlistApi,
  DeleteWishlistApi,
  GetWishlistByUserIdApi,
  GetCartByUserIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(BodyCareCart);

const styles = StyleSheet.create({
  increbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.lightpink,
    borderRadius: 5,
    height: height * 0.032,
    // marginTop: height * 0.02,
  },
  incredecretext: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.black,
    width: width * 0.07,
    textAlign: 'center',
    marginBottom: -3,
  },

  main_Box: {
    width: width * 0.93,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 3,
    marginBottom: height * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: height * 0.01,
  },
  imagebox: {
    width: width * 0.27,
    height: height * 0.18,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width * 0.014,
    marginLeft: width * 0.02,
    borderRadius: 8,
  },
  image: {
    width: width * 0.27,
    height: height * 0.18,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.005,
  },
  bottomBox: {
    padding: width * 0.02,
    width: width * 0.63,
  },
  heading: {
    color: COLORS.black,
    fontSize: 12,
    width: width * 0.5,
    ...FONTS.fiveHundred,
    height: height * 0.047,
  },
  ratings: {
    color: COLORS.black,
    fontSize: 11,
    width: width * 0.22,
    ...FONTS.fiveHundred,
    marginBottom: -3,
  },
  ratebox: {
    width: width * 0.12,
    backgroundColor: COLORS.green,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: width * 0.001,
    justifyContent: 'center',
    borderRadius: 3,
    marginRight: width * 0.04,
  },
  rate: {
    color: COLORS.white,
    fontSize: 12,
    ...FONTS.fiveHundred,
    marginBottom: -3,
    marginRight: width * 0.005,
  },
  star: {
    width: width * 0.028,
    height: height * 0.014,
    resizeMode: 'stretch',
    tintColor: COLORS.white,
  },
  heartbox: {
    width: width * 0.07,
    height: height * 0.04,
    resizeMode: 'contain',
    position: 'absolute',
    right: 10,
    top: 5,
    alignItems: 'center',
  },
  heart: {
    width: width * 0.05,
    height: height * 0.04,
    resizeMode: 'contain',
  },
  subtitle: {
    color: COLORS.gray60,
    fontSize: 11,
    ...FONTS.fiveHundred,
    width: width * 0.6,
    height: height * 0.043,
  },
  mrp: {
    color: COLORS.gray60,
    fontSize: 11,
    ...FONTS.fiveHundred,
    marginBottom: -1,
  },
  mrpprice: {
    color: COLORS.gray60,
    fontSize: 11,
    ...FONTS.fiveHundred,
    textDecorationLine: 'line-through',
    width: width * 0.16,
  },
  off: {
    color: COLORS.lightgreen,
    fontSize: 11,
    ...FONTS.sixHundred,
    width: width * 0.2,
  },
  price: {
    color: COLORS.black,
    fontSize: 13,
    ...FONTS.sixHundred,
    width: width * 0.17,
  },
});
