import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { COLORS, data, icons, images } from '../../constants';
import styles from './styles';
import { connect } from 'react-redux';
import Loader from './../../component/modalLoading/index';
import Button from './../../component/Button/index';
import HeadingSeeAll from './../../component/carts/headingSeeall';
import HomeSlider from './../../component/slider/homeAutoscrollslider';
import NewProductCart from './../../component/carts/newproductCart';
import ProductDetailSlider from './../../component/slider/productdetailSlider';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  GetAllProductByIdApi,
  GetRelativeProductApi,
} from './../../redux/actions/productAction';
import {
  AddToCartBuyNowApi,
  AddToCartFromBuyNowApi,
  AddTOCartApi,
  GetCartByUserIdApi,
} from './../../redux/actions/cartAction';
import Review from './../../component/carts/review';
import { GetSingleReviewApi } from './../../redux/actions/reviewAction';
import { http2 } from './../../services/api';
import Stars from 'react-native-stars';
import { GetWishlistByUserIdApi } from './../../redux/actions/wishlistAction';
import { GetPincodeApi } from './../../redux/actions/addressAction';
import { RNToasty } from 'react-native-toasty';
import Modal from 'react-native-modal';
import LoginBox from './../../component/carts/login';

const Listdata = [
  {
    id: 0,
    title: 'Discription',
  },
  {
    id: 1,
    title: 'Key Benifits',
  },
  {
    id: 2,
    title: 'Direction for use',
  },
  {
    id: 3,
    title: 'Safety Information',
  },
  {
    id: 4,
    title: 'Other Information',
  },
];

const { height, width } = Dimensions.get('window');

const ProductDetail = ({
  navigation,
  route,
  getcartbyuserid,
  AddToCartFromBuyNowApi,
  getuser,
  GetAllProductByIdApi,
  getAllProductById,
  GetRelativeProductApi,
  getrelativeproduct,
  AddTOCartApi,
  getalternativeproduct,
  GetWishlistByUserIdApi,
  GetCartByUserIdApi,
  GetPincodeApi,
  getpincode,
  dummyaddCartData,
  token,
}) => {
  const [loginModalVisible, setloginModalVisible] = useState(false);
  const [buylogin, setbuylogin] = useState(false);
  const coupon = route?.params?.coupon;

  const emailValidationSchema = yup.object().shape({
    pincode: yup.string().length(6).required('Sorry! we can’t delivere here.'),
  });

  const [loading, setLoading] = useState(false);
  const [switchs, setSwitchs] = useState('Discription');
  const [activityload, setActivityload] = useState(false);

  useEffect(() => {
    GetWishlistByUserIdApi();
    GetCartByUserIdApi();
    GetRelativeProductApi(getAllProductById?.product?.categoryId, 'categoryId');
    GetRelativeProductApi(getAllProductById?.product?.brandId, 'brandId');
  }, []);

  const [postData, setpostData] = useState({
    userId: getuser?._id,
    type: 'BUYNOW',
  });

  const [AddData, setAddData] = useState({
    userId: token && getuser?._id ? getuser?._id : (dummyaddCartData ? dummyaddCartData : ''),
    type: 'ADDTOCART',
  });

  const valid = getcartbyuserid?.data?.some(
    o => o?.productId?._id === getAllProductById?.product?._id,
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />

      {activityload ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLORS.red} />
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProductDetailSlider
              datalist={getAllProductById?.product?.productImages}
              id={getAllProductById?.product?._id}
            />

            <View style={{ marginLeft: width * 0.04 }}>
              <Text style={styles.subtitle}>
                {getAllProductById?.product?.name}
              </Text>

              <Text style={styles.subtitle}>
                {getAllProductById?.product?.description}
              </Text>

              <View style={styles.row}>
                <View style={styles.ratebox}>
                  <Text style={styles.rate}>
                    {getAllProductById?.product?.averageRating}
                  </Text>
                  <Image source={icons.fillstar} style={styles.star} />
                </View>
                <Text style={styles.ratings}>
                  {getAllProductById?.product?.averageRating} ratings
                </Text>
              </View>
              <View style={styles.row}>
                <Text numberOfLines={1} style={styles.price}>
                  ₹{getAllProductById?.product?.afterTaxValue}
                </Text>
                <Text style={styles.mrp}>MRP</Text>
                <Text numberOfLines={1} style={styles.mrpprice}>
                  ₹{getAllProductById?.product?.mrp}
                </Text>
                <Text numberOfLines={1} style={styles.off}>
                  ₹{getAllProductById?.product?.priceDiscount}OFF
                </Text>
              </View>
              <Text style={[styles.mrp, { marginBottom: height * 0.01 }]}>
                Include all taxes
              </Text>
            </View>
            <Text style={styles.heading}>Delivery to :</Text>
            <View>
              <Formik
                validationSchema={emailValidationSchema}
                initialValues={{ pincode: '' }}
                onSubmit={values => console.error('values', values)}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  isValid,
                  touched,
                }) => (
                  <>
                    <View
                      style={[
                        styles.inputBox,
                        !getpincode?.pincode &&
                        values?.pincode?.length == 6 && {
                          borderColor: COLORS.red,
                        },
                      ]}>
                      <TextInput
                        placeholder="Enter Pincode"
                        placeholderTextColor={COLORS.gray30}
                        style={styles.placeholdera}
                        maxLength={6}
                        keyboardType="numeric"
                        onChangeText={pincode => {
                          setFieldValue('pincode', pincode);
                          if (pincode?.length == 6) {
                            GetPincodeApi(pincode);
                          }
                        }}
                        value={values?.pincode}
                      />
                      <View>
                        {String(getpincode?.pincode)?.length == 6 &&
                          getpincode == null ? (
                          <Image style={styles.iicon} source={icons.iicon} />
                        ) : (
                          <View>
                            {getpincode && values?.pincode?.length == 6 && (
                              <Text style={styles.available}>Available</Text>
                            )}
                          </View>
                        )}
                      </View>
                    </View>
                    {!getpincode?.pincode && values?.pincode?.length == 6 ? (
                      <Text style={styles.error}>
                        Sorry! we can’t delivere here.
                      </Text>
                    ) : null}
                  </>
                )}
              </Formik>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation?.navigate('OfferList', {
                  disabledbtn: false,
                  page: 'ProductDetail',
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

              <TouchableOpacity>
                <Image source={icons.rarrow} style={styles.arrow} />
              </TouchableOpacity>
            </TouchableOpacity>

            {/* <FlatList
          data={data.OfferNotificationCartlist}
          renderItem={({item, index}) => (
            <OfferNotificationCart
              text1={item.text1}
              text2={item.text2}
              image={item.img}
              profileimg
            />
          )}
        /> */}
            {getAllProductById?.reviews?.[0] && (
              <View>
                <Text style={styles.heading}>Reviews</Text>

                <FlatList
                  data={getAllProductById?.reviews?.slice(0, 5)}
                  renderItem={({ item, index }) => (
                    <View style={styles.reviewbox}>
                      <View style={styles.row}>
                        <Image
                          source={{ uri: http2 + item?.userId?.image }}
                          style={styles.reviewimg}
                        />
                        <Text style={styles.reviewtext}>
                          {item?.userId?.fullName}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Stars
                          default={item?.rating}
                          spacing={5}
                          starSize={12}
                          count={5}
                          fullStar={icons.fillstar}
                          emptyStar={icons.star}
                          disabled={true}
                        />
                        <Text style={styles.reviewtext}>{item?.rating}</Text>
                      </View>
                      <Text style={styles.reviewcontant}>{item?.message}</Text>
                    </View>
                  )}
                />
              </View>
            )}
            {getAllProductById?.reviews?.length > 5 && (
              <TouchableOpacity
                onPress={() => navigation?.navigate('AllReview')}>
                <Text style={styles.allreviews}>Read all reviews!</Text>
              </TouchableOpacity>
            )}

            {(getAllProductById?.ratingDistribution?.fiveRating > 0 ||
              getAllProductById?.ratingDistribution?.fourRating > 0 ||
              getAllProductById?.ratingDistribution?.threeRating > 0 ||
              getAllProductById?.ratingDistribution?.twoRating > 0 ||
              getAllProductById?.ratingDistribution?.oneRating > 0) && (
                <View>
                  <Text style={styles.heading}>Ratings :</Text>

                  <View style={styles.starmainbox}>
                    {getAllProductById?.ratingDistribution?.fiveRating > 0 && (
                      <Review
                        user={getAllProductById?.ratingDistribution?.fiveRating}
                        rating="5"
                        count={5}
                        progress={'0.8'}
                      />
                    )}
                    {getAllProductById?.ratingDistribution?.fourRating > 0 && (
                      <Review
                        user={getAllProductById?.ratingDistribution?.fourRating}
                        rating="4"
                        count={4}
                        progress={'0.8'}
                      />
                    )}
                    {getAllProductById?.ratingDistribution?.threeRating > 0 && (
                      <Review
                        user={getAllProductById?.ratingDistribution?.threeRating}
                        rating="3"
                        count={3}
                        progress={'0.8'}
                      />
                    )}

                    {getAllProductById?.ratingDistribution?.twoRating > 0 && (
                      <Review
                        user={getAllProductById?.ratingDistribution?.twoRating}
                        rating="2"
                        count={2}
                        progress={'0.8'}
                      />
                    )}
                    {getAllProductById?.ratingDistribution?.oneRating > 0 && (
                      <Review
                        user={getAllProductById?.ratingDistribution?.oneRating}
                        rating="1"
                        count={1}
                        progress={'0.8'}
                      />
                    )}
                  </View>
                </View>
              )}

            <HomeSlider
              datalist={getAllProductById?.product?.productBanner}
              scrollimgstyle={{ width: width, borderRadius: 0 }}
            />
            <FlatList
              data={Listdata}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => setSwitchs(item.title)}
                  style={[
                    styles.switchbox,
                    switchs == item.title && {
                      backgroundColor: COLORS.red,
                      borderColor: COLORS.red,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.switchtext,
                      switchs == item.title && {
                        color: COLORS.white,
                      },
                    ]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
            {switchs == 'Discription' && (
              <Text style={styles.dotText}>
                {getAllProductById?.product?.description}
              </Text>
            )}
            {switchs == 'Key Benifits' && (
              <Text style={styles.dotText}>
                {getAllProductById?.product?.keyBenefit}
              </Text>
            )}
            {switchs == 'Direction for use' && (
              <Text style={styles.dotText}>
                {getAllProductById?.product?.directionForUse}
              </Text>
            )}
            {switchs == 'Safety Information' && (
              <Text style={styles.dotText}>
                {getAllProductById?.product?.SafetyInformation}
              </Text>
            )}
            {switchs == 'Other Information' && (
              <Text style={styles.dotText}>
                {getAllProductById?.product?.otherInformation}
              </Text>
            )}
            {getalternativeproduct?.[0] && (
              <View
                style={{
                  backgroundColor: '#A6F4F326',
                  marginTop: height * 0.02,
                }}>
                <HeadingSeeAll heading="Alternative Product" />
                <FlatList
                  data={getalternativeproduct}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <NewProductCart
                      image={{ uri: http2 + item?.thumbnail }}
                      title={item?.name}
                      subtitle={item?.description}
                      ratings={item?.reviewCount}
                      rate={item?.averageRating}
                      mrp={item?.mrp}
                      price={item?.afterTaxValue}
                      off={item?.priceDiscount}
                      id={item?._id}
                      navigation={navigation}
                      marginleft={{
                        marginLeft: index == 0 ? width * 0.03 : 0,
                        marginRight:
                        getalternativeproduct?.length - 1 ? width * 0.024 : 0,
                      }}
                      onPressimg={() =>
                        GetAllProductByIdApi(item?._id, navigation, data =>
                          setActivityload(data),
                        )
                      }

                    />
                  )}
                />
              </View>
            )}
            {getrelativeproduct?.[0] && (
              <View
                style={{
                  backgroundColor: '#A6F4F326',
                  marginBottom: height * 0.03,
                }}>
                <HeadingSeeAll
                  heading="Relative Product"
                // seeAll={getrelativeproduct?.length > 8}
                // onPress={() => navigation?.navigate('Product')}
                />
                <FlatList
                  data={getrelativeproduct}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <NewProductCart
                      image={{ uri: http2 + item?.thumbnail }}
                      title={item?.name}
                      subtitle={item?.description}
                      ratings={item?.reviewCount}
                      rate={item?.averageRating}
                      mrp={item?.mrp}
                      price={item?.afterTaxValue}
                      off={item?.priceDiscount}
                      id={item?._id}
                      navigation={navigation}
                      marginleft={{
                        marginLeft: index == 0 ? width * 0.03 : 0,
                        marginRight:
                          getrelativeproduct?.length - 1 ? width * 0.024 : 0,
                      }}
                      onPressimg={() =>
                        GetAllProductByIdApi(item?._id, navigation, data =>
                          setActivityload(data),
                        )
                      }
                     
                    />
                  )}
                />
              </View>
            )}

            {buylogin == true && (
              <View>
                <Modal
                  isVisible={loginModalVisible}
                  animationIn={'fadeInDown'}
                  backdropOpacity={0.35}>
                  <LoginBox
                    modalstyle={styles.modalloginbox}
                    onPress={() => {
                      navigation?.navigate('SignIn'), setbuylogin(false);
                      setloginModalVisible(false);
                    }}
                  />
                </Modal>
              </View>
            )}
          </ScrollView>
          <View style={styles.rowbtn}>
            {valid ? (
              <Button
                children="View to cart"
                iconbtn
                iconbtnICON
                btnStyle={{ width: width * 0.36, height: height * 0.05 }}
                onPress={() => navigation?.navigate('Cart')}
              />
            ) : (
              <Button
                children="Add to cart"
                iconbtn
                iconbtnICON
                btnStyle={{ width: width * 0.36, height: height * 0.05 }}
                onPress={() =>
                  AddTOCartApi(getAllProductById?.product?._id, AddData, data =>
                    setLoading(data),
                  )
                }
              />
            )}
            <Button
              mediumbtn
              children="Buy Now"
              onPress={() => {
                if (token == null) {
                  setbuylogin(true);
                  setloginModalVisible(true);
                } else {
                  AddToCartFromBuyNowApi(
                    getAllProductById?.product?._id,
                    postData,
                    navigation,
                    data => setLoading(data),
                  );
                }
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};
const mapStateToProps = state => ({
  getcartbyuserid: state.cart.getcartbyuserid,
  getuser: state.auth.getuser,
  getAllProductById: state.product.getAllProductById,
  getrelativeproduct: state.product.getrelativeproduct,
  getalternativeproduct: state.product.getalternativeproduct,
  getpincode: state.address.getpincode,
  dummyaddCartData: state.cart.dummyaddCartData,
  token: state.auth.token,
});

const mapDispatchToProps = {
  AddToCartFromBuyNowApi,
  GetAllProductByIdApi,
  GetRelativeProductApi,
  AddTOCartApi,
  GetWishlistByUserIdApi,
  GetCartByUserIdApi,
  GetPincodeApi,
  GetAllProductByIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
