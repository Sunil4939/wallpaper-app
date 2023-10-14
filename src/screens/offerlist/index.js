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
import {COLORS, data, icons, images} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import OfferNotificationCart from './../../component/offernotification/index';
import {GetCouponApi} from './../../redux/actions/couponAction';
import {GetCartByUserIdApi} from './../../redux/actions/cartAction.js';
import {http2} from './../../services/api';

const {height, width} = Dimensions.get('window');

const OfferList = ({
  navigation,
  route,
  GetCouponApi,
  getcoupon,
  GetCartByUserIdApi,
}) => {
  const [loading, setLoading] = useState(false);
  const turefalse = route.params;
  useEffect(() => {
    GetCouponApi(data => setLoading(data));
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <View style={styles.innercontainer}>
        {getcoupon ? (
          <FlatList
            data={getcoupon}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <OfferNotificationCart
                image={{uri: http2 + item?.image}}
                text1={item?.couponName}
                text2={item?.couponCode}
                disabled={turefalse?.disabledbtn}
                onPress={() => {
                  GetCartByUserIdApi(
                    data => setLoading(data),
                    navigation?.navigate(turefalse?.page),
                    item?.couponCode,
                  );
                }}
              />
            )}
          />
        ) : (
          <View style={styles.mainbox}>
            <Image source={images.noproduct2} style={styles.imagecartempty} />
            <Text style={styles.cartempty}>No Offers Available..</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({getcoupon: state.coupon.getcoupon});

const mapDispatchToProps = {GetCouponApi, GetCartByUserIdApi};

export default connect(mapStateToProps, mapDispatchToProps)(OfferList);
