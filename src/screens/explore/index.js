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
import {COLORS, data, icons, images} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import NewProductCart from './../../component/carts/newproductCart';
import HeadingSeeAll from './../../component/carts/headingSeeall';
import HomeSlider from './../../component/slider/homeAutoscrollslider';
import Category from './../../component/carts/categorycart';
import SearchBox from './../../component/InputText/search';
import LoginBox from './../../component/carts/login';
import {http2} from './../../services/api';
import {
  GetAllCategoryApi,
  GetFiftypersentDiscountApi,
  GetNewArrivalApi,
} from './../../redux/actions/categoryAction';

import {AddTOCartApi} from './../../redux/actions/cartAction';
import {
  GetFilterApi,
  GetAllProductByIdApi,
} from './../../redux/actions/productAction';

const {height, width} = Dimensions.get('window');
const Explore = ({
  navigation,
  token,
  GetAllCategoryApi,
  getcategory,
  GetFiftypersentDiscountApi,
  GetNewArrivalApi,
  GetFilterApi,
  fiftypercentoff,
  newarrival,
  GetAllProductByIdApi,
  AddTOCartApi,
  getuser,
  getHomedata,
  dummyaddCartData,
}) => {
  const [loading, setLoading] = useState(false);
  const [postData, setpostData] = useState({
    userId:
      token == null && getuser?._id == null ? dummyaddCartData : getuser?._id,
    type: 'ADDTOCART',
  });

  useEffect(() => {
    GetAllCategoryApi(data => setLoading(data));
    GetFiftypersentDiscountApi();
    GetNewArrivalApi();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLORS.red} />
        </View>
      ) : (
        <>
          <SearchBox
            editable={false}
            disabledfilter={true}
            editable={false}
            placeholder={'Search medicine'}
            searchStyle={{marginBottom: height * 0.01}}
            onPresssearch={() => navigation.navigate('Search')}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {getcategory && (
              <View>
                <HeadingSeeAll heading="Category" />
                <View>
                  <FlatList
                    data={getcategory}
                    numColumns={2}
                    columnWrapperStyle={{
                      justifyContent: 'space-between',
                      marginHorizontal: width * 0.03,
                    }}
                    renderItem={({item, index}) => (
                      <Category
                        img={{uri: http2 + item?.icon}}
                        text={item?.name}
                        categoryboxstyle={{width: width * 0.44}}
                        categoryimgboxstyle={{width: width * 0.44}}
                        onPress={() =>
                          GetFilterApi(
                            {categoryId: item?._id},
                            navigation?.navigate('Product'),
                          )
                        }
                      />
                    )}
                  />
                </View>
              </View>
            )}

            {getHomedata?.banner1 && (
              <HomeSlider
                datalist={getHomedata?.banner1}
                scrollimgstyle={styles.sliderimgstyle}
              />
            )}
            {newarrival && (
              <View
                style={{
                  backgroundColor: '#A6F4F326',
                  marginTop: height * 0.02,
                }}>
                <HeadingSeeAll
                  heading="New Arrival"
                  seeAll={newarrival?.length > 8}
                  onPress={() => {
                    GetFilterApi(
                      {
                        categoryId: newarrival?.[0]?.categoryId,
                      },
                      navigation?.navigate('Product'),
                      data => setLoading(data),
                    );
                  }}
                  marginzero
                />
                <FlatList
                  data={newarrival?.slice(0, 8)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <NewProductCart
                      key={index}
                      image={{uri: http2 + item?.thumbnail}}
                      title={item?.name}
                      subtitle={item?.description}
                      ratings={item?.reviewCount}
                      rate={item?.averageRating}
                      mrp={item?.mrp}
                      price={item?.afterTaxValue}
                      off={item?.priceDiscount?.toFixed(2)}
                      id={item?._id}
                      navigation={navigation}
                      marginleft={{
                        marginLeft: index == 0 ? width * 0.03 : 0,
                        marginRight: newarrival?.length - 1 ? width * 0.024 : 0,
                      }}
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
                    />
                  )}
                />
              </View>
            )}

            {fiftypercentoff && (
              <View>
                <HeadingSeeAll
                  heading="50% Off Order Now"
                  seeAll={fiftypercentoff?.length > 8}
                  onPress={() => {
                    GetFilterApi(
                      {
                        categoryId: fiftypercentoff?.[0]?.categoryId?._id,
                      },
                      navigation?.navigate('Product'),
                      data => setLoading(data),
                    );
                  }}
                  marginzero
                />
                <FlatList
                  data={fiftypercentoff?.slice(0, 8)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <NewProductCart
                      key={index}
                      image={{uri: http2 + item?.thumbnail}}
                      title={item?.name}
                      subtitle={item?.description}
                      ratings={item?.reviewCount}
                      rate={item?.averageRating}
                      mrp={item?.mrp}
                      price={item?.afterTaxValue}
                      off={item?.priceDiscount?.toFixed(2)}
                      id={item?._id}
                      navigation={navigation}
                      marginleft={{
                        marginLeft: index == 0 ? width * 0.03 : 0,
                        marginRight:
                          fiftypercentoff?.length - 1 ? width * 0.024 : 0,
                      }}
                      onPressimg={() =>
                        GetAllProductByIdApi(item?._id, navigation, data =>
                          setLoading(data),
                        )
                      }
                      onPresscart={() => {
                        AddTOCartApi(item?._id, postData, data =>
                          setLoading(data),
                        );
                      }}
                    />
                  )}
                />
              </View>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
  getuser: state.auth.getuser,
  getcategory: state.category.getcategory,
  fiftypercentoff: state.category.fiftypercentoff,
  newarrival: state.category.newarrival,
  getHomedata: state.home.getHomedata,
  dummyaddCartData: state.cart.dummyaddCartData,
});

const mapDispatchToProps = {
  GetAllCategoryApi,
  GetFilterApi,
  GetFiftypersentDiscountApi,
  GetNewArrivalApi,
  AddTOCartApi,
  GetAllProductByIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
