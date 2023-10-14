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
import SearchBox from './../../component/InputText/search';
import BodyCareCart from './../../component/carts/bodycarecart';
import ProductDetail from './../productDetail/index';
import Cart from './../Cart/index';
import {http2} from './../../services/api';
import {
  GetFilterApi,
  GetAllProductByIdApi,
} from './../../redux/actions/productAction';
import {GetWishlistByUserIdApi} from './../../redux/actions/wishlistAction';
import {
  AddTOCartApi,
  AddToCartFromBuyNowApi,
} from './../../redux/actions/cartAction';
import Modal from 'react-native-modal';
import LoginBox from './../../component/carts/login';

const {height, width} = Dimensions.get('window');

const Product = ({
  navigation,
  GetFilterApi,
  getFilter,
  GetWishlistByUserIdApi,
  AddTOCartApi,
  AddToCartFromBuyNowApi,
  GetAllProductByIdApi,
  getuser,
  route,
  token,
  dummyaddCartData,
}) => {
  const filterdata = route?.params;
  const [loading, setLoading] = useState(false);
  const [loginModalVisible, setloginModalVisible] = useState(false);
  const [buylogin, setbuylogin] = useState(false);

  useEffect(() => {
    GetFilterApi(data => setLoading(data));
  }, []);

  const [postData, setpostData] = useState({
    userId:
      token == null && getuser?._id == null ? dummyaddCartData : getuser?._id,
    type: 'ADDTOCART',
  });
  const [buyData, setbuyData] = useState({
    userId: getuser?._id,
    type: 'BUYNOW',
  });
  const [post, setpost] = useState({
    name: '',
  });

  const handleChange = (name, value) => {
    setpost({
      ...post,
      [name]: value,
    });
  };
  // console.log('getFilter?.data', getFilter?.data?.length);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <SearchBox
        disabled={true}
        placeholder={'Search medicine'}
        onPressfilter={() =>
          navigation?.navigate('Filter', {data: filterdata, name: post?.name})
        }
        value={post?.name}
        onChangeText={text => {
          handleChange('name', text);
          GetFilterApi({
            name: post?.name,
          });
        }}
        searchStyle={{marginBottom: height * 0.013}}
      />
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        {getFilter?.data?.length == '0' ? (
          <Image source={images.noproduct} style={styles.imagecartempty} />
        ) : (
          <View>
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
            <Text style={styles.blog}>{getFilter?.data?.length} Products</Text>
            <View style={{alignSelf: 'center'}}>
              {getFilter?.data?.map((item, index) => {
                return (
                  <BodyCareCart
                    image={{uri: http2 + item?.thumbnail}}
                    title={item?.name}
                    subtitle={item?.description}
                    ratings={item?.reviewCount}
                    rate={item?.averageRating}
                    price={item?.mrp}
                    mrpprice={item?.afterTaxValue}
                    off={item?.priceDiscount}
                    id={item?._id}
                    navigation={navigation}
                    onPressimg={() =>
                      GetAllProductByIdApi(item?._id, navigation, data =>
                        setLoading(data),
                      )
                    }
                    onPresscart={() =>
                      AddTOCartApi(item?._id, postData, data =>
                        setLoading(data),
                      )
                    }
                    onPressbuy={() => {
                      if (token == null) {
                        setbuylogin(true);
                        setloginModalVisible(true);
                      } else {
                        AddToCartFromBuyNowApi(
                          item?._id,
                          buyData,
                          navigation,
                          data => setLoading(data),
                        );
                      }
                    }}
                  />
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({
  getFilter: state.product.getFilter,
  getwishlistbyuserid: state.wishlist.getwishlistbyuserid,
  addtocart: state.cart.addtocart,
  getuser: state.auth.getuser,
  token: state.auth.token,
  dummyaddCartData: state.cart.dummyaddCartData,
});

const mapDispatchToProps = {
  GetFilterApi,
  GetWishlistByUserIdApi,
  AddTOCartApi,
  AddToCartFromBuyNowApi,
  GetAllProductByIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
