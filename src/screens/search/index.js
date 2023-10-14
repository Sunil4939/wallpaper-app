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
} from 'react-native';
import {COLORS, data, icons, images} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import SearchBox from './../../component/InputText/search';
import Filter from './../filter/index';
import NewProductCart from './../../component/carts/newproductCart';
import {
  GetFilterApi,
  GetAllProductByIdApi,
} from './../../redux/actions/productAction';
import {http2} from './../../services/api';
import {
  AddTOCartApi,
  GetCartByUserIdApi,
} from './../../redux/actions/cartAction';

const {height, width} = Dimensions.get('window');

const Search = ({
  navigation,
  GetFilterApi,
  getFilter,
  AddTOCartApi,
  GetAllProductByIdApi,
  GetCartByUserIdApi,
  getuser,
}) => {
  const [loading, setLoading] = useState(false);
  const [redbtn, setRedbtn] = useState(false);

  const [post, setpost] = useState({
    name: '',
  });
  const handleChange = (name, value) => {
    setpost({
      ...post,
      [name]: value,
    });
  };

  const [postData, setpostData] = useState({
    userId: getuser?._id,
    type: 'ADDTOCART',
  });
  useEffect(() => {
    // GetFilterApi();
    GetCartByUserIdApi(data => setLoading(data));
  }, []);

  return (
    <View
      style={[
        getFilter?.data?.[0] && post?.name
          ? styles.container
          : styles.whitecontainer,
      ]}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <SearchBox
        disabled={true}
        autoFocus={true}
        searchbox
        filter
        placeholder={'Search medicine'}
        onPressfilter={() => navigation?.navigate('Filter', post?.name)}
        value={post?.name}
        onChangeText={text => {
          handleChange('name', text);
          GetFilterApi({name: post?.name});
        }}
        searchStyle={{marginBottom: height * 0.015}}
      />

      <View>
        {getFilter?.data?.[0] && post?.name ? (
          <ScrollView
            style={styles.innercontainer}
            showsVerticalScrollIndicator={false}>
            <View style={{alignSelf: 'center', paddingBottom: height * 0.1}}>
              <FlatList
                data={getFilter?.data}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <NewProductCart
                    image={{uri: http2 + item?.thumbnail}}
                    title={item?.name}
                    subtitle={item?.description}
                    ratings={item?.reviewCount}
                    rate={item?.averageRating}
                    price={item?.afterTaxValue}
                    mrp={item?.mrp}
                    off={item?.priceDiscount}
                    id={item?._id}
                    navigation={navigation}
                    marginleft={{marginLeft: width * 0.002}}
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
          </ScrollView>
        ) : (
          <View>
            {post?.name && (
              <View style={styles.innerwhitecontainer}>
                <Image
                  source={images.noproduct}
                  style={styles.imagecartempty}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  getFilter: state.product.getFilter,
  getuser: state.auth.getuser,
});

const mapDispatchToProps = {
  GetFilterApi,
  AddTOCartApi,
  GetAllProductByIdApi,
  GetCartByUserIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
