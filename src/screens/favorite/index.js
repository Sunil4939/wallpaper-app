import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import {COLORS, FONTS, data, images, icons} from '../../constants';
import {connect} from 'react-redux';
import styles from './styles';
import BodyCareCart from './../../component/carts/bodycarecart';
import Cart from './../Cart/index';
import Payment from './../Payment/index';
import {GetWishlistByUserIdApi} from './../../redux/actions/wishlistAction';
import {AddToCartFromBuyNowApi} from './../../redux/actions/cartAction';
import {http2} from './../../services/api';
import {AddTOCartApi} from './../../redux/actions/cartAction';
import OrderBuy from './../buynow/index';
import Loader from './../../component/modalLoading/index';
import {GetAllProductByIdApi} from './../../redux/actions/productAction';

const {height, width} = Dimensions.get('window');

const Favorite = ({
  navigation,
  GetWishlistByUserIdApi,
  getwishlistbyuserid,
  AddTOCartApi,
  getuser,
  AddToCartFromBuyNowApi,
  GetAllProductByIdApi,
}) => {
  useEffect(() => {
    GetWishlistByUserIdApi(data => setLoading(data));
  }, []);

  const [loading, setLoading] = useState(false);

  const [postData, setpostData] = useState({
    userId: getuser?._id,
    type: 'ADDTOCART',
  });

  const [postDatabuy, setpostDatabuy] = useState({
    userId: getuser?._id,
    type: 'BUYNOW',
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <View style={styles.innercontainer}>
        {getwishlistbyuserid?.[0] ? (
          <View>
            <FlatList
              data={getwishlistbyuserid}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                console.log(
                  'item?.productId.type  favvv====',
                  item?.productId?._id,
                );
                return (
                  <BodyCareCart
                    image={{uri: http2 + item?.productId?.thumbnail}}
                    title={item?.productId?.name}
                    subtitle={item?.productId?.description}
                    ratings={item?.productId?.reviewCount}
                    rate={item?.productId?.averageRating}
                    price={item?.productId?.afterTaxValue}
                    mrpprice={item?.productId?.mrp}
                    off={item?.productId?.priceDiscount}
                    id={item?.productId?._id}
                    navigation={navigation}
                    // heartactive={true}
                    onPressimg={() =>
                      GetAllProductByIdApi(
                        item?.productId?._id,
                        navigation,
                        data => setLoading(data),
                      )
                    }
                    onPresscart={() =>
                      AddTOCartApi(item?.productId?._id, postData, data =>
                        setLoading(data),
                      )
                    }
                    onPressbuy={() => {
                      if (item?.productId?.type == 'BUYNOW') {
                        navigation?.navigate('OrderBuy');
                      } else {
                        AddToCartFromBuyNowApi(
                          item?.productId?._id,
                          postDatabuy,
                          navigation,
                          data => setLoading(data),
                        );
                      }
                    }}
                    // onPressbuy={() =>
                    //   AddToCartFromBuyNowApi(
                    //     item?.productId?._id,
                    //     postDatabuy,
                    //     navigation,
                    //     data => setLoading(data),
                    //   )
                    // }
                  />
                );
              }}
            />
          </View>
        ) : (
          <View style={styles.mainbox}>
            <Image source={images.empty} style={styles.imagecartempty} />
            <Text style={styles.cartempty}>No Carts Add In Favourite..</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  getwishlistbyuserid: state.wishlist.getwishlistbyuserid,
  getuser: state.auth.getuser,
});

const mapDispatchToProps = {
  GetWishlistByUserIdApi,
  AddTOCartApi,
  AddToCartFromBuyNowApi,
  GetAllProductByIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
