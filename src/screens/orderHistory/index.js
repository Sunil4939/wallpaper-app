import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  BackHandler,
} from 'react-native';
import {COLORS, FONTS, data, icons, images} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import OrderList from './../../component/carts/orderList';
import {
  GetOrderByUserIdApi,
  GetOrderByIdApi,
} from './../../redux/actions/orderAction';
import {http2} from './../../services/api';

const {height, width} = Dimensions.get('window');

const OrderHistory = ({
  navigation,
  GetOrderByUserIdApi,
  GetOrderByIdApi,
  getorderbyuserid,
  route,
}) => {
  const page = route?.params?.page;

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetOrderByUserIdApi(data => setLoading(data));
  }, []);

  function handleBackButtonClick() {
    if (page == 'Profile') {
      navigation?.goBack();
    } else {
      navigation?.navigate('Home');
    }
    return true;
  }

  BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        {getorderbyuserid ? (
          <View>
            {getorderbyuserid?.map((item, index) => {
              return (
                <OrderList
                  image={{
                    uri: http2 + item?.product?.[0]?.productId?.thumbnail,
                  }}
                  orderid={item?._id}
                  heading={item?.product?.[0]?.productId?.name}
                  qty={item?.product?.[0]?.quantity}
                  moreproductcount={item?.product?.length-1}
                  mrp={item?.product?.[0]?.productId?.mrp}
                  price={item?.product?.[0]?.productId?.afterTaxValue}
                  status={item?.product?.[0]?.status}
                  navigation={navigation}
                  onPress={() =>
                    GetOrderByIdApi(item?._id, navigation, data =>
                      setLoading(data),
                    )
                  }
                />
              );
            })}
          </View>
        ) : (
          <View style={styles.mainbox}>
            <Image source={images.noproduct2} style={styles.imagecartempty} />
            <Text style={styles.cartempty}>No Order History ..</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({
  getorderbyuserid: state?.order?.getorderbyuserid,
});

const mapDispatchToProps = {GetOrderByUserIdApi, GetOrderByIdApi};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
