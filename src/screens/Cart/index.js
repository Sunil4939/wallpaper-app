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
  ActivityIndicator,
} from 'react-native';
import {COLORS, FONTS, data, icons, images} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import BodyCareCart from './../../component/carts/bodycarecart';
import Button from './../../component/Button/index';
import PriceDetail from './../../component/carts/pricedetail';
import Address from './../../component/carts/addresscart';
import Modal from 'react-native-modal';
import LoginBox from './../../component/carts/login';
import {http2} from './../../services/api';
import {
  GetAddressByIdApi,
  GetAddressByUserIdApi,
} from './../../redux/actions/addressAction';
import {GetWishlistByUserIdApi} from './../../redux/actions/wishlistAction';
import {RNToasty} from 'react-native-toasty';
import {
  GetCartByUserIdApi,
  AddQuantityApi,
  RemoveQuantityApi,
  RemoveCartByIdApi,
  AddToCartFromBuyNowApi,
} from './../../redux/actions/cartAction';

const {height, width} = Dimensions.get('window');
const Cart = ({
  navigation,
  route,
  getuser,
  getaddressbyid,
  GetAddressByIdApi,
  getaddressbyuserid,
  GetAddressByUserIdApi,
  getcartbyuserid,
  GetCartByUserIdApi,
  AddQuantityApi,
  RemoveQuantityApi,
  RemoveCartByIdApi,
  AddToCartFromBuyNowApi,
  GetWishlistByUserIdApi,
  getcoupon,
  dummyaddCartData,
  token,
}) => {
  const coupon = route?.params?.coupon;

  const [isModalVisible, setModalVisible] = useState(false);
  const [loginModalVisible, setloginModalVisible] = useState(false);
  const [buylogin, setbuylogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [removeid, setRemoveid] = useState();

  useEffect(() => {
    if (getuser?._id) {
      GetAddressByUserIdApi(data => setLoading(data));
      GetWishlistByUserIdApi(data => setLoading(data));
    }
    GetCartByUserIdApi(data => setLoading(data));
  }, []);

  const [postData, setpostData] = useState({
    userId: getuser?._id,
    type: 'BUYNOW',
  });
  const cartcount = getcartbyuserid?.data?.length;

  // console.log(
  //   'getaddressbyid?._id',
  //   getaddressbyid?._id,
  //   getaddressbyuserid?.[0]?._id,
  // );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLORS.red} />
        </View>
      ) : (
        <View>
          <View>
            {getcartbyuserid ? (
              <>
                <ScrollView
                  style={styles.innercontainer}
                  showsVerticalScrollIndicator={false}>
                  <Text style={styles.blog}>{cartcount} Carts </Text>

                  {getcartbyuserid?.data?.[0] && (
                    <View style={{alignSelf: 'center'}}>
                      {getcartbyuserid?.data?.map((item, index) => {
                        return (
                          <BodyCareCart
                            disabled={true}
                            key={index}
                            image={{uri: http2 + item?.productId?.thumbnail}}
                            title={item?.productId?.name}
                            subtitle={item?.productId?.description}
                            mrpprice={item?.productId?.mrp}
                            price={item?.price}
                            id={item?.productId?._id}
                            off={item?.productId?.priceDiscount?.toFixed(2)}
                            incredecre={item?.quantity}
                            showincre
                            onPressincrement={() =>
                              AddQuantityApi(item?.productId?._id)
                            }
                            onPressdecrement={() =>
                              RemoveQuantityApi(item?.productId?._id)
                            }
                            onPressbuy={() => {
                              if (token == null) {
                                setbuylogin(true);
                                setloginModalVisible(true);
                              } else {
                                AddToCartFromBuyNowApi(
                                  item?.productId?._id,
                                  postData,
                                  navigation,
                                  data => setLoading(data),
                                );
                              }
                            }}
                            onPressremove={() => {
                              setModalVisible(true),
                                setRemoveid(item?.productId?._id);
                            }}
                          />
                        );
                      })}
                    </View>
                  )}

                  <View>
                    <Modal
                      isVisible={isModalVisible}
                      animationIn={'fadeInDown'}
                      backdropOpacity={0.2}>
                      <View style={styles.modalbox}>
                        <Text style={styles.modalhead}>
                          Are you want to delete this Product
                        </Text>
                        <View style={styles.modalbtnrow}>
                          <Button
                            children="No"
                            mediumbtn
                            iconbtn
                            btnStyle={{marginRight: width * 0.07}}
                            onPress={() => setModalVisible(false)}
                          />
                          <Button
                            children="Yes"
                            mediumbtn
                            btnStyle={{
                              width: width * 0.28,
                              height: height * 0.04,
                              borderRadius: 4,
                            }}
                            onPress={() => {
                              RemoveCartByIdApi(removeid),
                                setModalVisible(false);
                            }}
                          />
                        </View>
                      </View>
                    </Modal>

                    {buylogin == true && (
                      <View>
                        <Modal
                          isVisible={loginModalVisible}
                          animationIn={'fadeInDown'}
                          backdropOpacity={0.35}>
                          <LoginBox
                            modalstyle={styles.modalloginbox}
                            onPress={() => {
                              navigation?.navigate('SignIn', dummyaddCartData),
                                setbuylogin(false);
                              setloginModalVisible(false);
                            }}
                          />
                        </Modal>
                      </View>
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('OfferList', {
                        disabledbtn: false,
                        page: 'Cart',
                      })
                    }
                    style={styles.viewofferbox}>
                    <Image source={icons.percent} style={styles.percent} />
                    {coupon ? (
                      <Text style={styles.viewoffertext}>
                        You Save ₹ {coupon} On this order
                      </Text>
                    ) : (
                      <Text style={styles.viewoffertext}>
                        View best available offers
                      </Text>
                    )}
                    <Image source={icons.rarrow} style={styles.arrow} />
                  </TouchableOpacity>
                  <PriceDetail
                    quantityprice={getcartbyuserid?.totalPrice}
                    discount={getcartbyuserid?.productDiscount}
                    coupon={
                      getcartbyuserid?.couponData?.discount > 0
                        ? getcartbyuserid?.couponData?.discount
                        : 0
                    }
                    tax={getcartbyuserid?.tax?.toFixed(2)}
                    quantity={getcartbyuserid?.quantity}
                    charge={getcartbyuserid?.shippingCharge}
                    total={getcartbyuserid?.totalPayable}
                    save={getcartbyuserid?.couponData?.discount}
                    headingmain="Price detail"
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
                      addressStyle={{marginBottom: height * 0.1}}
                      onPresschange={() =>
                        navigation.navigate('DeliveryAddress', getaddressbyid)
                      }
                      Change="Change"
                    />
                  ) : (
                    <View>
                      {token == null ? (
                        <View style={styles.addmoredummybox}></View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => navigation.navigate('AddAddress')}
                          activeOpacity={0.5}
                          style={styles.addmorebox}>
                          <Image source={icons.plus} style={styles.plus} />
                          <Text style={styles.addmore}>Add Address</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </ScrollView>
                <View style={styles.price_bottom}>
                  <View>
                    <Text style={styles.bottom_text1}>
                      ₹{getcartbyuserid?.totalPayable}
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
                          (getaddressbyid?._id ||
                            getaddressbyuserid?.[0]?._id) &&
                          token
                        ) {
                          navigation?.navigate('Payment', {
                            type: 'ADDTOCART',
                            total: getcartbyuserid?.totalPayable,
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
              </>
            ) : (
              <View style={styles.mainbox}>
                <Text style={styles.cartempty}>Your Cart Is Empty</Text>
                <Image source={images.empty} style={styles.imagecartempty} />
              </View>
            )}
          </View>
          {/* )} */}
        </View>
      )}
    </View>
  );
};
const mapStateToProps = state => ({
  token: state?.auth?.token,
  getuser: state?.auth?.getuser,
  getaddressbyid: state?.address?.getaddressbyid,
  getaddressbyuserid: state?.address?.getaddressbyuserid,
  getcartbyuserid: state?.cart?.getcartbyuserid,
  getcoupon: state?.coupon?.getcoupon,
  dummyaddCartData: state?.cart?.dummyaddCartData,
});

const mapDispatchToProps = {
  GetAddressByIdApi,
  GetAddressByUserIdApi,
  GetCartByUserIdApi,
  AddQuantityApi,
  RemoveQuantityApi,
  RemoveCartByIdApi,
  AddToCartFromBuyNowApi,
  GetWishlistByUserIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
