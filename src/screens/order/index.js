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
import BodyCareCart from './../../component/carts/bodycarecart';
import SearchBox from './../../component/InputText/search';
import Button from './../../component/Button/index';
import PriceDetail from './../../component/carts/pricedetail';
import Address from './../../component/carts/addresscart';
import AddAddress from './../addAddress/index';
import ProfileBox from './../../component/carts/profilecart';
import OrderList from './../../component/carts/orderList';
import Tracking from './../tracking/index';
import {GetCartByUserIdOfBuyNowApi} from './../../redux/actions/cartAction';
import InputBox from './../../component/InputText/index';
import Stars from 'react-native-stars';
import {CreateReviewApi} from './../../redux/actions/reviewAction';
import RazorpayCheckout from 'react-native-razorpay';
import {
  GetOrderByIdApi,
  CancelledStatusApi,
  ReturnRequestStatusApi,
  UpdateTransactionApi,
  GetOrderByUserIdApi,
} from './../../redux/actions/orderAction';
import {http2} from './../../services/api';
import {viewFileFromUrl} from './../../services/fileSystem.js';

const {height, width} = Dimensions.get('window');

const Order = ({
  navigation,
  GetCartByUserIdOfBuyNowApi,
  getcartbyuseridbuynow,
  CreateReviewApi,
  getAllProductById,
  GetOrderByIdApi,
  getorderbyid,
  getuser,
  CancelledStatusApi,
  ReturnRequestStatusApi,
  UpdateTransactionApi,
  GetOrderByUserIdApi,
}) => {
  const [loading, setLoading] = useState(false);
  const [reviewPost, setReviewPost] = useState({
    productId: getAllProductById?.product?._id,
    userId: getuser?._id,
    message: null,
    rating: null,
  });

  const handleChange = (name, value) => {
    setReviewPost({
      ...reviewPost,
      [name]: value,
    });
  };
  const orderGet = getorderbyid?.data;

  const Rozarpayonline = async () => {
    var options = {
      description: 'Credits towards consultation',
      currency: 'INR',
      key: 'rzp_test_sRLd371Eatsnrl', // Your api key
      amount: orderGet?.product?.[0]?.productId?.afterTaxValue * 100,
      name: 'Priya sahu',
      prefill: {
        contact: '9399329654',
      },
      theme: {color: COLORS.red},
    };
    RazorpayCheckout?.open(options)
      .then(data => {
        UpdateTransactionApi(
          orderGet?._id,
          {
            transactionId: data?.razorpay_payment_id,
          },
          navigation,
          (paymentStatus = 'ONLINE'),
        );
      })
      .catch(error => {
        // alert(`Error: ${error?.code} | ${error?.description}`);
      });
  };
  useEffect(() => {
    GetCartByUserIdOfBuyNowApi();
    GetOrderByUserIdApi(data => setLoading(data));
  }, []);

  // console.log(
  //   'orderGet?.product',
  // );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        {/* {orderGet?.product?.[0]?.status == 'PENDING' ||
        orderGet?.product?.[0]?.status == 'CANCELLED' ? null : (
          <Text style={styles.greentext}>Order is successfully placed !</Text>
        )} */}
        <View>
          {orderGet?.product?.map((item, index) => {
            return (
              <OrderList
                disabled={true}
                image={{uri: http2 + item?.productId?.thumbnail}}
                orderid={item?._id}
                heading={item?.productId?.name}
                qty={item?.quantity}
                deliverydate={item.deliverydate}
                mrp={item?.productId?.mrp}
                price={item?.productId?.afterTaxValue}
                status={item?.status}
              />
            );
          })}
        </View>
        {orderGet?.product?.[0]?.status == 'CANCELLED' ||
        orderGet?.product?.[0]?.status == 'RETURNREQUEST' ? null : (
          <View>
            {orderGet?.product?.[0]?.status == 'PENDING' ? (
              <Button
                mediumbtn
                children="PAY  NOW"
                btnStyle={styles.btnstyle}
                onPress={Rozarpayonline}
              />
            ) : orderGet?.product?.[0]?.status == 'ORDERED' ||
              orderGet?.product?.[0]?.status == 'ACCEPTED' ? (
              <Button
                iconbtn
                children="CANCEL"
                btnStyle={styles.btnstyle}
                onPress={() => CancelledStatusApi(orderGet?._id, navigation)}
              />
            ) : orderGet?.product?.[0]?.status == 'DELIVERED' ? (
              <Button
                iconbtn
                children="RETURN REQUEST"
                btnStyle={styles.btnstylereturn}
                onPress={() =>
                  ReturnRequestStatusApi(orderGet?._id, orderGet?.product?._id)
                }
              />
            ) : null}
          </View>
        )}

        <PriceDetail
          quantityprice={orderGet?.totalPrice}
          discount={orderGet?.product?.[0]?.productDiscount}
          coupon={
            orderGet?.product?.[0]?.discount > 0
              ? orderGet?.product?.[0]?.discount
              : 0
          }
          charge={orderGet?.shippingCharges}
          tax={
            orderGet?.product?.[0]?.tax > 0 ? orderGet?.product?.[0]?.tax : 0
          }
          total={orderGet?.payableAmount}
          save={orderGet?.product?.[0]?.discount}
          quantity={orderGet?.product?.[0]?.quantity}
          headingmain="Order summery"
          addmorebtn
        />
        <Address
          disabled={true}
          firstname={orderGet?.address?.name}
          address={orderGet?.address?.houseNumber}
          landmark={orderGet?.address?.landmark}
          area={orderGet?.address?.area}
          state={orderGet?.address?.stateName}
          city={orderGet?.address?.cityName}
          pincode={orderGet?.address?.pincode}
          mobile={orderGet?.address?.mobile}
        />

        {orderGet?.product?.[0]?.status == 'PENDING' ||
        orderGet?.product?.[0]?.status == 'CANCELLED' ? null : (
          <View>
            {orderGet?.product?.[0]?.status == 'DELIVERED' && (
              <View>
                <Image source={images.orderdone} style={styles.orderdone} />
                <View style={{marginTop: height * 0.02}}>
                  <Stars
                    default={reviewPost?.rating}
                    spacing={10}
                    starSize={22}
                    count={5}
                    fullStar={icons.fillstar}
                    emptyStar={icons.star}
                    update={val => handleChange('rating', val)}
                  />
                  <InputBox
                    label="Write a review"
                    placeholder="Share your experience "
                    onChangeText={text => handleChange('message', text)}
                    value={reviewPost?.message}
                    multiLine={true}
                    numberOfLines={5}
                    textAlignVertical="top"
                    labelStyle={{
                      marginTop: height * 0.03,
                    }}
                  />
                </View>

                <Button
                  mediumbtn
                  children="Submit"
                  btnStyle={styles.btnstyle}
                  onPress={() => CreateReviewApi(reviewPost, navigation)}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    viewFileFromUrl(orderGet?.invoice, 'download')
                  }>
                  <View style={styles.downloadbox}>
                    <Text style={styles.text}>Download Invoice</Text>
                    <Image
                      source={icons.download}
                      style={styles.downloadicon}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <ProfileBox
              profileimage={icons.order}
              text="Tracking"
              profileBoxStyle={styles.profileBoxStyle}
              onPress={() => {
                GetOrderByIdApi(orderGet?._id), navigation.navigate('Tracking');
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({
  getcartbyuseridbuynow: state.cart.getcartbyuseridbuynow,
  getAllProductById: state.product.getAllProductById,
  getuser: state.auth.getuser,
  getorderbyid: state.order.getorderbyid,
});

const mapDispatchToProps = {
  GetCartByUserIdOfBuyNowApi,
  CreateReviewApi,
  GetOrderByIdApi,
  CancelledStatusApi,
  ReturnRequestStatusApi,
  UpdateTransactionApi,
  GetOrderByUserIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
