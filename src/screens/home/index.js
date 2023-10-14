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
import Category from './../../component/carts/categorycart';
import Stars from 'react-native-stars';
import SearchBox from './../../component/InputText/search';
import { GetHomeDataApi } from './../../redux/actions/homeActions';
import { http2 } from './../../services/api';
import {
  AddTOCartApi,
  GetCartByUserIdApi,
} from './../../redux/actions/cartAction';
import {
  GetAllProductByIdApi,
  GetFilterApi,
} from './../../redux/actions/productAction';
import {
  GetWishlistByUserIdApi,
  CreateWishlistApi,
  DeleteWishlistApi,
} from './../../redux/actions/wishlistAction';
import Carousel from 'react-native-snap-carousel';
import { GetSeenCountApi } from './../../redux/actions/notificationAction';

const { height, width } = Dimensions.get('window');

const Home = ({
  navigation,
  GetSeenCountApi,
  getuser,
  GetHomeDataApi,
  getHomedata,
  AddTOCartApi,
  GetAllProductByIdApi,
  GetFilterApi,
  token,
  dummyaddCartData,
}) => {
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    GetHomeDataApi(data => setLoading(data));
  }, []);

  const [postData, setpostData] = useState({
    userId:
      token && getuser?._id ? getuser?._id : dummyaddCartData,
    type: 'ADDTOCART',
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={modalLoading} />
      {loading && getHomedata == null ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLORS.red} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBox
            disabledfilter={true}
            editable={false}
            searchbox
            placeholder={'Search medicine'}
            onPresssearch={() => navigation.navigate('Search')}
          />

          {getHomedata?.banner1 && (
            <HomeSlider datalist={getHomedata?.banner1} />
          )}
          {getHomedata?.category && (
            <View>
              <HeadingSeeAll heading="Category" />
              <FlatList
                data={getHomedata?.category}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <Category
                    key={index}
                    img={{ uri: http2 + item?.icon }}
                    text={item?.text}
                    categoryboxstyle={{
                      marginLeft: index == 0 ? width * 0.03 : 0,
                      marginRight:
                        getHomedata?.category?.length - 1 ? width * 0.03 : 0,
                    }}
                    onPress={() =>
                      GetFilterApi(
                        { categoryId: item?._id },
                        navigation?.navigate('Product'),
                        (data) => setModalLoading(data),
                      )
                    }
                  />
                )}
              />
            </View>
          )}
          {getHomedata?.banner2 && (
            <HomeSlider
              datalist={getHomedata?.banner2}
              scrollimgstyle={styles.scrollimage}
            />
          )}
          {getHomedata?.newArrival && (
            <View style={styles.backgroundblue}>
              <HeadingSeeAll
                heading="New Arrival"
                seeAll={getHomedata?.newArrival?.length > 8}
                onPress={() =>
                  navigation?.navigate('Product', {
                    data: getHomedata?.newArrival,
                    heading: 'New Arrival',
                  })
                }
              />
              <FlatList
                data={getHomedata?.newArrival?.slice(0, 8)}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <NewProductCart
                      key={item?._id}
                      image={{ uri: http2 + item?.thumbnail }}
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
                          getHomedata?.newArrival.length - 1
                            ? width * 0.024
                            : 0,
                      }}
                      onPressimg={() =>
                        GetAllProductByIdApi(item?._id, navigation, data =>
                          setModalLoading(data),
                        )
                      }
                    />
                  );
                }}
              />
            </View>
          )}
          {getHomedata?.banner3?.bannerImage && (
            <Image
              source={{ uri: http2 + getHomedata?.banner3?.bannerImage }}
              style={styles.oneImg}
            />
          )}
          {getHomedata?.catergoryWithProduct?.combo && (
            <View style={{ backgroundColor: '#A6F4F326' }}>
              <HeadingSeeAll
                heading="Combo"
                seeAll={getHomedata?.catergoryWithProduct?.combo?.length > 8}
                onPress={() =>
                  GetFilterApi(
                    {
                      categoryId:
                        getHomedata?.catergoryWithProduct?.combo?.[0]
                          ?.categoryId,
                    },
                    navigation?.navigate('Product'),
                    data => setModalLoading(data),
                  )
                }
              />
              <FlatList
                data={getHomedata?.catergoryWithProduct?.combo?.slice(0, 8)}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <NewProductCart
                    key={index}
                    image={{ uri: http2 + item?.thumbnail }}
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
                        getHomedata?.newArrival.length - 1 ? width * 0.024 : 0,
                    }}
                    onPressimg={() =>
                      GetAllProductByIdApi(item?._id, navigation, data =>
                        setModalLoading(data),
                      )
                    }
                    
                  />
                )}
              />
            </View>
          )}

          {getHomedata?.catergoryWithProduct?.bodycare && (
            <View style={styles.backgroundblue}>
              <HeadingSeeAll
                heading="Bodycare"
                seeAll={getHomedata?.catergoryWithProduct?.bodycare?.length > 8}
                onPress={() =>
                  GetFilterApi(
                    {
                      categoryId:
                        getHomedata?.catergoryWithProduct?.bodycare?.[0]
                          ?.categoryId,
                    },
                    navigation?.navigate('Product'),
                    data => setModalLoading(data),
                  )
                }
              />
              <FlatList
                data={getHomedata?.catergoryWithProduct?.bodycare?.slice(0, 8)}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <NewProductCart
                    key={index}
                    image={{ uri: http2 + item?.thumbnail }}
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
                        getHomedata?.newArrival.length - 1 ? width * 0.024 : 0,
                    }}
                    onPressimg={() =>
                      GetAllProductByIdApi(item?._id, navigation, data =>
                        setModalLoading(data),
                      )
                    }
                  
                  />
                )}
              />
            </View>
          )}
          {getHomedata?.banner4?.bannerImage && (
            <Image
              source={{ uri: http2 + getHomedata?.banner4?.bannerImage }}
              style={styles.oneImg}
            />
          )}

          {getHomedata?.catergoryWithProduct?.bathAndBody && (
            <View style={{ backgroundColor: '#A6F4F326' }}>
              <HeadingSeeAll
                heading="Bath & Body"
                seeAll={
                  getHomedata?.catergoryWithProduct?.bathAndBody?.length > 8
                }
                onPress={() =>
                  GetFilterApi(
                    {
                      categoryId:
                        getHomedata?.catergoryWithProduct?.bathAndBody?.[0]
                          ?.categoryId,
                    },
                    navigation?.navigate('Product'),
                    data => setModalLoading(data),
                  )
                }
              />
              <FlatList
                data={getHomedata?.catergoryWithProduct?.bathAndBody?.slice(
                  0,
                  8,
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <NewProductCart
                    key={index}
                    image={{ uri: http2 + item?.thumbnail }}
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
                        getHomedata?.newArrival.length - 1 ? width * 0.024 : 0,
                    }}
                    onPressimg={() =>
                      GetAllProductByIdApi(item?._id, navigation, data =>
                        setModalLoading(data),
                      )
                    }
                   
                  />
                )}
              />
            </View>
          )}

          {getHomedata?.catergoryWithProduct?.['Daily use'] && (
            <View style={{ backgroundColor: '#A6F4F326' }}>
              <HeadingSeeAll
                heading="Daily use"
                seeAll={
                  getHomedata?.catergoryWithProduct?.['Daily use']?.length > 8
                }
                onPress={() =>
                  GetFilterApi(
                    {
                      categoryId:
                        getHomedata?.catergoryWithProduct?.['Daily use']?.[0]
                          ?.categoryId,
                    },
                    navigation?.navigate('Product'),
                    data => setModalLoading(data),
                  )
                }
              />
              <FlatList
                data={getHomedata?.catergoryWithProduct?.['Daily use']?.slice(
                  0,
                  8,
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <NewProductCart
                    key={index}
                    image={{ uri: http2 + item?.thumbnail }}
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
                        getHomedata?.newArrival.length - 1 ? width * 0.024 : 0,
                    }}
                    onPressimg={() =>
                      GetAllProductByIdApi(item?._id, navigation, data =>
                        setModalLoading(data),
                      )
                    }
                   
                  />
                )}
              />
            </View>
          )}

          {/* <View style={styles.apkaapnaBox}>
          <Text style={styles.apkaapna}>Aapka Apna Ayurveda</Text>
          <Text style={styles.apkaapna}>Wellmaats - The Ayurveda co.</Text>
          <Button
            children="Take Self Assessment "
            roundbtn
            btnStyle={styles.selfassest}
            onPress={() => navigation.navigate('SelfAssessment')}
          />
          <Button
            children=" Consult Ayurveda Expert"
            roundbtn
            btnStyle={{alignSelf: 'center', width: width * 0.8}}
            onPress={() => navigation.navigate('Consultexpert')}
          />
          </View> */}

          {getHomedata?.banner5 && (
            <View>
              {getHomedata?.banner5?.map((item, index) => (
                <View style={styles.explorebox} key={item?._id}>
                  <Image
                    source={{
                      uri: http2 + item?.bannerImage,
                    }}
                    style={styles.exploreimg}
                  />
                  <View>
                    <Text style={styles.exploretitle}>{item?.title}</Text>
                    <Text style={styles.exploretitle2}>
                      Get regular exercise and control your weight.
                    </Text>
                    <Button
                      children="Explore Now"
                      roundsmallbtn
                      btnStyle={{ alignSelf: 'center' }}
                      onPress={() =>
                        navigation?.navigate('Explore', { link: item?.link })
                      }
                    />
                  </View>
                </View>
              ))}
            </View>
          )}

          {getHomedata?.howItWork && (
            <View style={{ backgroundColor: '#C8F5F426' }}>
              <Text style={styles.howitwork}>How it work</Text>
              {getHomedata?.howItWork?.map((item, index) => (
                <View key={index} activeOpacity={0.6} style={styles.howworkBox}>
                  <Image
                    source={{ uri: http2 + item?.icon }}
                    style={styles.howworkimg}
                  />
                  <Text style={styles.howworktitle}>{item?.title}</Text>
                  <Text style={styles.howworktitle2}>{item?.discription}</Text>
                </View>
              ))}
            </View>
          )}

          {getHomedata?.banner6?.bannerImage && (
            <Image
              source={{ uri: http2 + getHomedata?.banner6?.bannerImage }}
              style={styles.oneImg}
            />
          )}
          {getHomedata?.tactimonials && (
            <View>
              <HeadingSeeAll
                heading="Tactimonials"
                seeAll={getHomedata?.tactimonials?.length > 3}
                onPress={() => navigation?.navigate('Testimonial')}
              />

              <Carousel
                data={getHomedata?.tactimonials.slice(0, 3)}
                renderItem={({ item, index }) => (
                  <View style={styles.tectimonialBox}>
                    <View activeOpacity={0.6} style={styles.tectimonialboximg}>
                      <Image
                        source={{ uri: http2 + item?.image }}
                        style={styles.tectimonialimg}
                      />
                    </View>

                    <View style={styles.tectimonialBox2}>
                      <Text style={styles.tectimonialtitle}>{item?.name}</Text>

                      <View style={styles.star}>
                        <Stars
                          default={item?.rating}
                          count={5}
                          starSize={13}
                          spacing={5}
                          fullStar={icons.fillstar}
                          emptyStar={icons.star}
                          disabled={true}
                        />
                      </View>
                      <Text style={styles.tectimonialtitle2}>
                        {item?.description}
                      </Text>
                    </View>
                  </View>
                )}
                sliderWidth={width}
                itemWidth={width}
              />
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};
const mapStateToProps = state => ({
  getHomedata: state?.home?.getHomedata,
  getuser: state?.auth?.getuser,
  getwishlistbyuserid: state.wishlist.getwishlistbyuserid,
  token: state.auth.token,
  dummyaddCartData: state.cart.dummyaddCartData,
});

const mapDispatchToProps = {
  GetHomeDataApi,
  AddTOCartApi,
  GetAllProductByIdApi,
  GetWishlistByUserIdApi,
  GetFilterApi,
  GetCartByUserIdApi,
  CreateWishlistApi,
  GetSeenCountApi,
  DeleteWishlistApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
