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
import {COLORS, FONTS, data, icons, images} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import BodyCareCart from './../../component/carts/bodycarecart';
import Order from './../order/index';

const {height, width} = Dimensions.get('window');
const AllOrderShow = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />

      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <View style={{alignSelf: 'center'}}>
          {data.NewProductCartdata.map((item, index) => (
            <BodyCareCart
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              ratings={item.ratings}
              rate={item.rate}
              price={item.price}
              off={item.off}
              showincre
              onPressimg={() => navigation.navigate('Order')}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrderShow);
