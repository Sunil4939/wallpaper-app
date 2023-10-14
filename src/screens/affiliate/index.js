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
import {COLORS, data, icons, images} from './../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import ProfileBox from './../../component/carts/profilecart';
import PaymentHistory from './../paymentHistory/index';
import AffiliateSystem from './../affiliateSystem/index';
import WithDrawRequest from './../withdrawrequest/index';

const {height, width} = Dimensions.get('window');
const Affiliate = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <View style={styles.innercontainer}>
        <View style={styles.box}>
          <ProfileBox
            profileimage={icons.order}
            text="Affiliate System"
            rarrow
            onPress={() => navigation.navigate('AffiliateSystem')}
          />
          <ProfileBox
            profileimage={icons.order}
            text="Payment History"
            rarrow
            onPress={() => navigation.navigate('PaymentHistory')}
          />
          <ProfileBox
            profileimage={icons.order}
            text="Withdraw Request"
            rarrow
            onPress={() => navigation.navigate('WithDrawRequest')}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Affiliate);
