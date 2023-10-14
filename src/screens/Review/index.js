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
import {http2} from './../../services/api';
import {COLORS, data, icons, images} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import OfferNotificationCart from './../../component/offernotification/index';
import Stars from 'react-native-stars';

const {height, width} = Dimensions.get('window');

const AllReview = ({getAllProductById}) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <View>
        <FlatList
          data={getAllProductById?.reviews}
          renderItem={({item, index}) => (
            <View style={styles.reviewbox}>
              <View style={styles.row}>
                <Image
                  source={{uri: http2 + item?.userId?.image}}
                  style={styles.reviewimg}
                />
                <Text style={styles.reviewtext}>{item?.userId?.fullName}</Text>
              </View>
              <View style={styles.row}>
                <Stars
                  default={item?.rating}
                  spacing={5}
                  starSize={12}
                  count={5}
                  fullStar={icons.fillstar}
                  emptyStar={icons.star}
                  disabled={true}
                />
                <Text style={styles.reviewtext}>{item?.rating}</Text>
              </View>
              <Text style={styles.reviewcontant}>{item?.message}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  getAllProductById: state.product.getAllProductById,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AllReview);
