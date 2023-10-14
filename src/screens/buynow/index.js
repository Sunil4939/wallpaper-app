import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import {COLORS, FONTS, data, icons, images} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import Button from './../../component/Button/index';
import PriceDetail from './../../component/carts/pricedetail';
import Address from './../../component/carts/addresscart';
import {GetCartByUserIdOfBuyNowApi} from './../../redux/actions/cartAction';
import {
  GetAddressByUserIdApi,
  GetAddressByIdApi,
} from './../../redux/actions/addressAction';
import {http2} from './../../services/api';
import {RNToasty} from 'react-native-toasty';

const {height, width} = Dimensions.get('window');

const OrderBuy = ({
  navigation,
  GetCartByUserIdOfBuyNowApi,
  getcartbyuseridbuynow,
  getaddressbyid,
  GetAddressByIdApi,
  GetAddressByUserIdApi,
  getaddressbyuserid,
  token,
  dummygetcartbuynow,
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetAddressByUserIdApi();
    // GetCartByUserIdOfBuyNowApi();
  }, []);

  console.log('dummygetcartbuynow  ', dummygetcartbuynow);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.innercontainer}>
        {getcartbyuseridbuynow?.data?.map((item, index) => (
          <View style={styles.main_Box}>
            <Image
              source={{uri: http2 + item?.productId?.thumbnail}}
              style={styles.imagebox}
            />
            <View style={styles.bottomBox}>
              <Text numberOfLines={2} style={styles.heading}>
                {item?.productId?.name}
              </Text>
              <Text numberOfLines={2} style={styles.subtitle}>
                {item?.productId?.description}
              </Text>
              <View style={styles.row}>
                <Text numberOfLines={1} style={styles.price}>
                  ₹{item?.productId?.afterTaxValue}
                </Text>
                <Text numberOfLines={1} style={styles.mrp}>
                  MRP
                </Text>
                <Text numberOfLines={1} style={styles.mrpprice}>
                  ₹{item?.productId?.mrp}
                </Text>

                <Text numberOfLines={1} style={styles.off}>
                  {item?.productId?.priceDiscount}% OFF
                </Text>
              </View>
            </View>
          </View>
        ))}
        <PriceDetail
          quantityprice={getcartbyuseridbuynow?.totalPrice}
          discount={getcartbyuseridbuynow?.productDiscount}
          charge={getcartbyuseridbuynow?.shippingCharge}
          coupon={
            getcartbyuseridbuynow?.discount > 0
              ? getcartbyuseridbuynow?.discount
              : 0
          }
          tax={getcartbyuseridbuynow?.tax?.toFixed(2)}
          total={getcartbyuseridbuynow?.totalPayable}
          quantity={getcartbyuseridbuynow?.data?.[0]?.quantity}
          save={getcartbyuseridbuynow?.discount}
          headingmain="Order summery"
          addmorebtn
          onpressAdd={() => navigation.navigate('Home')}
        />
        {getaddressbyuserid ? (
          <Address
            disabled={true}
            firstname={
              getaddressbyid?.name
                ? getaddressbyid?.name
                : getaddressbyuserid[0]?.name
            }
            mobile={
              getaddressbyid?.mobile
                ? getaddressbyid?.mobile
                : getaddressbyuserid[0]?.mobile
            }
            address={
              getaddressbyid?.houseNumber
                ? getaddressbyid?.houseNumber
                : getaddressbyuserid[0]?.houseNumber
            }
            landmark={
              getaddressbyid?.landmark
                ? getaddressbyid?.landmark
                : getaddressbyuserid[0]?.landmark
            }
            area={
              getaddressbyid?.area
                ? getaddressbyid?.area
                : getaddressbyuserid[0]?.area
            }
            city={
              getaddressbyid?.cityName
                ? getaddressbyid?.cityName
                : getaddressbyuserid[0]?.cityName
            }
            state={
              getaddressbyid?.stateName
                ? getaddressbyid?.stateName
                : getaddressbyuserid[0]?.stateName
            }
            pincode={
              getaddressbyid?.pincode
                ? getaddressbyid?.pincode
                : getaddressbyuserid[0]?.pincode
            }
            addressStyle={{marginBottom: height * 0.05}}
            onPresschange={() =>
              navigation.navigate('DeliveryAddress', getaddressbyid)
            }
            Change="Change"
          />
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('AddAddress')}
            activeOpacity={0.5}
            style={styles.addmorebox}>
            <Image source={icons.plus} style={styles.plus} />
            <Text style={styles.addmore}>Add Address</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View style={styles.price_bottom}>
        <View>
          <Text style={styles.bottom_text1}>
            ₹{getcartbyuseridbuynow?.totalPayable}
          </Text>
          <Text style={styles.bottom_text2}>View price detail</Text>
        </View>
        <Button
          children="Place Order"
          mediumbtn
          onPress={() => {
            if (token == null) {
              setbuylogin(true);
              setloginModalVisible(true);
            } else {
              if (
                (getaddressbyid?._id || getaddressbyuserid?.[0]?._id) &&
                token
              ) {
                navigation?.navigate('Payment', {
                  total: getcartbyuseridbuynow?.totalPayable,
                });
              } else {
                RNToasty.Error({
                  title: 'please enter valid address',
                });
              }
            }
          }}
        />
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  getcartbyuseridbuynow: state.cart.getcartbyuseridbuynow,
  getaddressbyuserid: state.address.getaddressbyuserid,
  getaddressbyid: state.address.getaddressbyid,
  token: state.auth.token,
  dummygetcartbuynow: state.cart.dummygetcartbuynow,
});

const mapDispatchToProps = {
  GetCartByUserIdOfBuyNowApi,
  GetAddressByIdApi,
  GetAddressByUserIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBuy);
