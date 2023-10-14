import React, {useState, useRef, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {icons, images} from '../../constants';
import {FONTS, COLORS} from '../../constants';
import {connect} from 'react-redux';
import {http2} from './../../services/api';
import {
  CreateWishlistApi,
  DeleteWishlistApi,
  GetWishlistByUserIdApi,
  GetCartByUserIdApi,
} from './../../redux/actions/wishlistAction';
import Share from 'react-native-share';
import ImgToBase64 from 'react-native-image-base64';

const {width, height} = Dimensions.get('window');

const ProductDetailSlider = ({
  onPress,
  datalist,
  scrollimgstyle,
  getHomedata,
  source,
  id,
  getwishlistbyuserid,
  getcartbyuserid,
  getuser,
  token,
  getAllProductById,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef(null);

  const useInterval = (callback, delay) => {
    const savedCallback = useRef(); //null ref a raha

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(() => {
    goNextSlide();
    if (currentSlideIndex == datalist?.length - 1) {
      ref?.current?.scrollToOffset(0);
      setCurrentSlideIndex(0);
    }
  }, 2500);

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != datalist?.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const [condition, setCondition] = useState(false);

  useEffect(() => {
    if (getwishlistbyuserid && getwishlistbyuserid?.[0]) {
      if (getwishlistbyuserid?.some(i => i?.productId?._id === id)) {
        setCondition(true);
      } else {
        setCondition(false);
      }
    } else {
      setCondition(false);
    }
  }, [getwishlistbyuserid]);

  const handleChange = () => {
    if (condition) {
      DeleteWishlistApi(id);
      GetWishlistByUserIdApi();
      setCondition(false);
    } else {
      CreateWishlistApi(id);
      GetWishlistByUserIdApi();
      setCondition(true);
    }
  };
  const [base64Img, setBase64Img] = useState();
  ImgToBase64.getBase64String(`${http2 + datalist?.[0]}`)
    .then(base64String => {
      setBase64Img('data:image/jpeg;base64,' + base64String);
      // console.log('base64 : ', base64Img);
    })
    .catch(err => console.log(err));
  const options = {
    message: `${getAllProductById?.product?.name}`,
    url: base64Img,
  };

  const share = () => {
    Share.open(options)
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
  };
  return (
    <View>
      <View>
        <View style={styles.row}>
          <TouchableOpacity onPress={share} style={styles.sharebox}>
            <Image source={icons.share} style={styles.share} />
          </TouchableOpacity>
          {token == null ? null : (
            <TouchableOpacity onPress={handleChange} style={styles.heartbox}>
              {condition ? (
                <Image
                  source={icons.heart}
                  style={[styles.heart, {tintColor: COLORS.primary}]}
                />
              ) : (
                <Image source={icons.heart} style={[styles.heart]} />
              )}
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={datalist}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          ref={ref}
          renderItem={({item, index}) => (
            <View style={styles.scrollBox}>
              <View style={styles.scrollimgBox}>
                {http2 + datalist?.[0] ? (
                  <Image
                    source={{uri: http2 + item}}
                    style={[styles.scrollImage, scrollimgstyle]}
                  />
                ) : (
                  <Image
                    source={images.home1}
                    style={[styles.scrollImage, scrollimgstyle]}
                  />
                )}
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.dotbox}>
        {datalist?.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                ...styles.dotstyle,
                backgroundColor:
                  currentSlideIndex == index ? COLORS.green : COLORS.gray20,
              }}></View>
          );
        })}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  getuser: state?.auth?.getuser,
  getwishlistbyuserid: state?.wishlist?.getwishlistbyuserid,
  getcartbyuserid: state.cart.getcartbyuserid,
  token: state.auth.token,
  getAllProductById: state.product.getAllProductById,
});

const mapDispatchToProps = {
  CreateWishlistApi,
  DeleteWishlistApi,
  GetWishlistByUserIdApi,
  GetCartByUserIdApi,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailSlider);

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    borderColor: COLORS.gray10,
    alignSelf: 'center',
  },
  row: {
    width: width * 0.84,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    marginTop: height * 0.014,
  },
  scrollBox: {
    width: width,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    marginTop: height * 0.01,
  },
  scrollimgBox: {
    width: width * 0.9,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingTop: height * 0.05,
    height: height * 0.29,
    borderColor: COLORS.gray10,
  },
  scrollImage: {
    width: width * 0.65,
    height: height * 0.21,
    resizeMode: 'stretch',
    alignSelf: 'center',
    borderRadius: 8,
  },

  dotbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
  },
  dotstyle: {
    height: width * 0.022,
    width: width * 0.022,
    marginRight: width * 0.01,
    borderRadius: 10,
  },
  heartbox: {
    width: width * 0.08,
    height: height * 0.04,
    resizeMode: 'contain',
    position: 'absolute',
    right: 5,
    top: 5,
    alignItems: 'center',
  },
  sharebox: {
    width: width * 0.08,
    height: width * 0.077,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginTop: height * 0.008,
  },
  share: {
    width: width * 0.04,
    height: height * 0.04,
    resizeMode: 'contain',
  },
  heart: {
    width: width * 0.05,
    height: height * 0.04,
    resizeMode: 'contain',
  },
});
