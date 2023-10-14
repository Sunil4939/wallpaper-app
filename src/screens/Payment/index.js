import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import styles from './styles';
import Modal from 'react-native-modal';
import { icons, images, COLORS } from '../../constants';
import Button from './../../component/Button/index';
import {
  CreateOrderApi,
  UpdateTransactionApi,
  GetOrderByUserIdApi,
} from './../../redux/actions/orderAction';
import { connect } from 'react-redux';
import Loader from './../../component/modalLoading/index';
import HeaderLeft from '../../component/header/HeaderLeft';

const { height, width } = Dimensions.get('window');

const Payment = ({
  CreateOrderApi,
  navigation,
  UpdateTransactionApi,
  getorderbyuserid,
  GetOrderByUserIdApi,
  route,
}) => {
  const orderItem = route?.params;
  const [radio, setRadio] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [btndisable, setBtndisable] = useState(false);

  const [postData, setpostData] = useState({
    paymentStatus: null,
  });

  navigation?.setOptions({
    headerLeft: () => (
      <HeaderLeft onPress={() => btndisable ? navigation?.navigate("OrderHistory") : navigation?.goBack()} title={"Payment"} />
    ),
  })

  const backAction = () => {
    if (btndisable) {
      navigation?.navigate("OrderHistory", { page: 'payment' })
    } else {
      navigation?.goBack()
    }
    return true;
  };

  BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );


  const types = orderItem?.type == 'ADDTOCART' ? 'ADDTOCART' : 'BUYNOW';

  console.log(("order total : ", orderItem?.total));

  const Rozarpayonline = async () => {

    CreateOrderApi(postData, null, '', types, (res, load) => {
      setLoading(load);
      if (res?._id) {
        setBtndisable(true)
        var options = {
          description: 'Credits towards consultation',
          // image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: 'rzp_test_sRLd371Eatsnrl', // Your api key
          amount: Number(orderItem?.total) * 100,
          name: 'Priya sahu',
          prefill: {
            contact: '9399329654',
          },
          theme: { color: COLORS.red },
        };
        RazorpayCheckout?.open(options)
          .then(data => {
            UpdateTransactionApi(
              res?._id,
              { transactionId: data?.razorpay_payment_id },
              navigation,
            );
          })
          .catch(error => {
            console.log(`Error: ${error?.code}|${error?.description}`);
          });
      }
    });
  };

  const handleSubmit = () => {
    if (postData?.paymentStatus == 'ONLINE') {
      Rozarpayonline();
    } else if (postData?.paymentStatus == 'COD') {
      CreateOrderApi(postData, navigation, '', types, (res, load) => {
        setLoading(load);
        if (res?._id) {
          setBtndisable(true)
        }
      });
    } else {
      console.log('both pyment not have');
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.innercontainer}>
        {orderItem?.total &&
          <View style={styles.viewallbox}>
            <Text style={styles.text1}>You Pay ₹ {orderItem?.total}</Text>
          </View>
        }
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setRadio(1);
            setpostData({ paymentStatus: 'ONLINE' });
          }}
          style={styles.pymentBox}>
          <Image source={icons.phonepy} style={styles.pymtIcon} />
          <Text style={styles.pymtname}>Online</Text>
          <View style={styles.radioBox}>
            {radio === 1 && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setpostData({ paymentStatus: 'COD' });
            setRadio(2);
          }}
          style={styles.pymentBox}>
          <Image source={icons.cashon} style={styles.pymtIcon} />
          <Text style={styles.pymtname}> Cash On Delivery</Text>
          <View style={styles.radioBox}>
            {radio === 2 && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
        <Button
          children="Payment"
          mediumbtn
          btnStyle={[
            { alignSelf: 'center', marginTop: height * 0.05 },
            btndisable && { backgroundColor: COLORS.gray30 },
          ]}
          onPress={handleSubmit}
          disabled={btndisable}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  getorderbyuserid: state.order.getorderbyuserid,
});

const mapDispatchToProps = {
  CreateOrderApi,
  UpdateTransactionApi,
  GetOrderByUserIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
