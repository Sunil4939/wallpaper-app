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
import AddressCart from './../../component/carts/address';
import {
  GetAddressByUserIdApi,
  GetAddressByIdApi,
  GetAddressDeleteApi,
} from './../../redux/actions/addressAction';

const {height, width} = Dimensions.get('window');

const DeliveryAddress = ({
  navigation,
  GetAddressByUserIdApi,
  getaddressbyuserid,
  GetAddressByIdApi,
  GetAddressDeleteApi,
  route,
}) => {
  useEffect(() => {
    GetAddressByUserIdApi(data => setLoading(data));
  }, []);
  const [loading, setLoading] = useState(false);
  const addressmatch = route?.params;
  const [radioBtnid, setradioBtnid] = useState(addressmatch?._id);
  // console.log('getaddressbyuserid', getaddressbyuserid);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        {getaddressbyuserid?.[0] && (
          <FlatList
            data={getaddressbyuserid}
            renderItem={({item, index}) => (
              <AddressCart
                key={index}
                firstname={item?.name}
                mobile={item?.mobile}
                address={item?.houseNumber}
                landmark={item?.landmark}
                area={item?.area}
                country={item?.country}
                city={item?.cityName}
                state={item?.stateName}
                pincode={item?.pincode}
                onPress={() => {
                  setradioBtnid(item?._id);
                  GetAddressByIdApi(item?._id, navigation, data =>
                    setLoading(data),
                  );
                }}
                checked={radioBtnid == item?._id ? true : false}
                onPressedit={() => {
                  navigation?.navigate('AddAddress', {
                    item: item,
                    showeditbtn: true,
                  });
                }}
                onPressdelete={() => GetAddressDeleteApi(item?._id)}
              />
            )}
          />
        )}

        <TouchableOpacity
          onPress={() =>
            navigation?.navigate('AddAddress', {showeditbtn: false})
          }
          activeOpacity={0.5}
          style={styles.addmorebox}>
          <Image source={icons.plus} style={styles.plus} />
          <Text style={styles.addmore}>Add Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({
  getaddressbyuserid: state.address.getaddressbyuserid,
});

const mapDispatchToProps = {
  GetAddressByUserIdApi,
  GetAddressByIdApi,
  GetAddressDeleteApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddress);
