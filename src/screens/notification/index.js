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
import OfferNotificationCart from './../../component/offernotification/index';
import {GetNotificationuseridApi} from './../../redux/actions/notificationAction';

const {height, width} = Dimensions.get('window');

const Notification = ({GetNotificationuseridApi, getallNotification}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetNotificationuseridApi();
  }, []);
  console.log('getallNotification', getallNotification?.[0]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <View style={styles.innercontainer}>
        {getallNotification && getallNotification?.[0] ? (
          <FlatList
            data={getallNotification}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <OfferNotificationCart
                image={icons.notify}
                text1={item?.title}
                text2={item?.message}
                proimg={{tintColor: COLORS.red}}
              />
            )}
          />
        ) : (
          <View style={styles.mainbox}>
            <Image source={images.noproduct2} style={styles.imagecartempty} />
            <Text style={styles.cartempty}>No Notification here..</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  getallNotification: state.notification.getallNotification,
});

const mapDispatchToProps = {GetNotificationuseridApi};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
