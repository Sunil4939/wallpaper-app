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
  TextInput,
} from 'react-native';
import {COLORS, SIZES, data, icons, images} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import Button from './../../component/Button/index';
import CheckBox from 'react-native-check-box';
import {
  GetProductFilterApi,
  GetAllFilterApi,
  GetFilterApi,
} from './../../redux/actions/productAction';

const Checkboxprice = ({min, max, isChecked, onClick}) => {
  return (
    <View style={styles.boxcheck}>
      <CheckBox
        isChecked={isChecked}
        onClick={onClick}
        checkedCheckBoxColor={COLORS.primary}
        uncheckedCheckBoxColor={COLORS.gray50}
        rightTextView={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.checktext}>₹ {min} - </Text>
            <Text style={styles.checktext}>₹ {max}</Text>
          </View>
        }
        style={{marginLeft: width * 0.01}}
      />
    </View>
  );
};

const Checkboxcart = ({text, isChecked, onClick}) => {
  return (
    <View style={styles.boxcheck}>
      <CheckBox
        isChecked={isChecked}
        onClick={onClick}
        checkedCheckBoxColor={COLORS.primary}
        uncheckedCheckBoxColor={COLORS.gray50}
        rightTextView={<Text style={styles.checktext}>{text}</Text>}
        style={{marginLeft: width * 0.01}}
      />
    </View>
  );
};

const {height, width} = Dimensions.get('window');
const Filter = ({
  navigation,
  GetProductFilterApi,
  productfilter,
  getallproductfilter,
  GetAllFilterApi,
  GetFilterApi,
  getFilter,
  route,
}) => {
  const productname = route?.params;

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState('Categories');

  const [min, setMin] = useState([]);
  const [max, setMax] = useState([]);

  const [discountMax, setDiscountMax] = useState([]);
  const [discountMin, setDiscountMin] = useState([]);

  const [postData, setpostData] = useState({
    categoryId: [],
    brandId: [],
    name: '',
    price: '',
    filter: '',
    discountMax: [],
    discountMin: [],
    priceRangeMin: [],
    priceRangeMax: [],
  });

  useEffect(() => {
    if (productname?.data) {
      setpostData(productname?.data);
      setMin(productname?.data?.priceRangeMin);
      setMax(productname?.data?.priceRangeMax);
      setDiscountMin(productname?.data?.discountMin);
      setDiscountMax(productname?.data?.discountMax);
    } else {
      setpostData({
        ...postData,
        name: productname?.name,
      });
    }
  }, [productname]);

  const handleChange = (name, value) => {
    setpostData({
      ...postData,
      [name]: value,
    });
  };

  const handleCategoryChange = value => {
    let arr = [...postData.categoryId];
    if (arr.includes(value)) {
      arr.splice(postData.categoryId.indexOf(value), 1);
    } else {
      arr.push(value);
    }
    handleChange('categoryId', arr);
  };

  const handleBrandChange = value => {
    let arr = [...postData.brandId];
    if (arr.includes(value)) {
      arr.splice(postData.brandId.indexOf(value), 1);
    } else {
      arr.push(value);
    }
    handleChange('brandId', arr);
  };

  const handlePriceChange = async item => {
    let arr1 = [...min];
    let arr2 = [...max];
    if (arr1.includes(item?.min) && arr2.includes(item?.max)) {
      arr1.splice(min.indexOf(item), 1);
      arr2.splice(max.indexOf(item), 1);
    } else {
      arr1.push(item?.min);
      arr2.push(item?.max);
    }
    setMin(arr1);
    setMax(arr2);
  };

  const handlediscountChange = async item => {
    let discount1 = [...discountMin];
    let discount2 = [...discountMax];
    if (discount1.includes(item?.min) && discount2.includes(item?.max)) {
      discount1.splice(min.indexOf(item), 1);
      discount2.splice(max.indexOf(item), 1);
    } else {
      discount1.push(item?.min);
      discount2.push(item?.max);
    }
    setDiscountMin(discount1);
    setDiscountMax(discount2);
  };

  useEffect(() => {
    GetAllFilterApi();
    GetFilterApi();
  }, []);

  const reset = async () => {
    setMin(null);
    setMax(null);
    setDiscountMin(null);
    setDiscountMax(null);
    setpostData({
      categoryId: null,
      brandId: null,
      name: null,
      price: null,
      filter: null,
      discountMax: null,
      discountMin: null,
      priceRangeMin: null,
      priceRangeMax: null,
    });
    navigation?.navigate('Product');
  };
  console.log('postData', min, max, discountMax, discountMin);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <View showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <View style={styles.heightborder}>
            <TouchableOpacity
              onPress={() => setActive('Categories')}
              style={[
                styles.categoriesbox,
                active === 'Categories' && {
                  borderRightWidth: 2.8,
                  backgroundColor: '#EAEAEA',
                  borderColor: COLORS.green,
                },
              ]}>
              <Text style={styles.categories}>Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActive('Brand')}
              style={[
                styles.categoriesbox,
                active === 'Brand' && {
                  borderRightWidth: 2.8,
                  backgroundColor: '#EAEAEA',
                  borderColor: COLORS.green,
                },
              ]}>
              <Text style={styles.categories}>Brand</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActive('Price')}
              style={[
                styles.categoriesbox,
                active === 'Price' && {
                  borderRightWidth: 2.8,
                  backgroundColor: '#EAEAEA',
                  borderColor: COLORS.green,
                },
              ]}>
              <Text style={styles.categories}>Price</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActive('Discount')}
              style={[
                styles.categoriesbox,
                active === 'Discount' && {
                  borderRightWidth: 2.8,
                  backgroundColor: '#EAEAEA',
                  borderColor: COLORS.green,
                },
              ]}>
              <Text style={styles.categories}>Discount</Text>
            </TouchableOpacity>
          </View>
          {active == 'Categories' && (
            <View>
              <View>
                {getallproductfilter?.category?.map((item, index) => (
                  <Checkboxcart
                    text={item?.name}
                    isChecked={postData?.categoryId?.some(i => i === item?._id)}
                    onClick={() => {
                      handleCategoryChange(item?._id);
                    }}
                  />
                ))}
              </View>
            </View>
          )}

          {active == 'Brand' && (
            <View>
              {getallproductfilter?.brand?.map((item, index) => (
                <Checkboxcart
                  text={item?.name}
                  isChecked={postData?.brandId?.some(i => i === item?._id)}
                  onClick={() => {
                    handleBrandChange(item?._id);
                  }}
                />
              ))}
            </View>
          )}

          {active == 'Price' && (
            <View>
              {getallproductfilter?.price?.map((item, index) => (
                <Checkboxprice
                  min={item?.min}
                  max={item?.max}
                  isChecked={min?.some(i => i == item?.min)}
                  onClick={() => {
                    handlePriceChange(item);
                  }}
                />
              ))}
            </View>
          )}

          {active == 'Discount' && (
            <View>
              {getallproductfilter?.discount?.map((item, index) => (
                <Checkboxprice
                  min={item?.min}
                  max={item?.max}
                  isChecked={discountMax?.some(i => i == item?.max)}
                  onClick={() => {
                    handlediscountChange(item);
                  }}
                />
              ))}
            </View>
          )}
        </View>
      </View>
      <View>
        <View style={styles.rowbtn}>
          <Button
            mediumbtn
            children="Reset"
            btnStyle={styles.reset}
            btntextStyle={{color: COLORS.red}}
            onPress={() => reset()}
          />
          <Button
            mediumbtn
            children="Submit"
            onPress={() => {
              GetFilterApi(
                {
                  ...postData,
                  priceRangeMax: max,
                  priceRangeMin: min,
                  discountMax: discountMax,
                  discountMin: discountMin,
                },
                navigation?.navigate('Product', {
                  ...postData,
                  priceRangeMax: max,
                  priceRangeMin: min,
                  discountMax: discountMax,
                  discountMin: discountMin,
                }),
                data => setLoading(data),
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  productfilter: state.product.productfilter,
  getallproductfilter: state.product.getallproductfilter,
  getFilter: state.product.getFilter,
});

const mapDispatchToProps = {
  GetProductFilterApi,
  GetAllFilterApi,
  GetFilterApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
