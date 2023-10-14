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
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
// import Loader from './../../component/modalLoading/index';
import ProfileBox from './../../component/carts/profilecart';
import Button from './../../component/Button/index';
import {
  LogoutApi,
  GetuserIdApi,
  UpdateUserApi,
} from './../../redux/actions/authActions';
import LoginBox from './../../component/carts/login';
import {http2} from './../../services/api';

const {height, width} = Dimensions.get('window');
const Profile = ({
  navigation,
  LogoutApi,
  token,
  route,
  GetuserIdApi,
  getuser,
}) => {
  useEffect(() => {
    GetuserIdApi();
    UpdateUserApi();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(images?.profile2);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <View style={styles.innercontainer}>
        {token == null ? (
          <LoginBox onPress={() => navigation.navigate('SignIn')} />
        ) : (
          <View>
            <View style={styles.greenbox}>
              <View style={styles.row}>
                <View>
                  <Image
                  style={styles.person}
                  source={getuser?.image ? {uri: http2 + getuser?.image} : images?.profile2}
                />
                  
                </View>
                <View>
                  {getuser?.fullName && (
                    <Text style={styles.persontext}>{getuser?.fullName}</Text>
                  )}
                  {getuser?.phoneNumber && (
                    <Text style={styles.persontext}>
                      {getuser?.phoneNumber}
                    </Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={styles.editbox}
                onPress={() => navigation.navigate('ProfileEdit')}>
                <Image source={icons.edit} style={styles.edit} />
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <ProfileBox
                profileimage={icons.order}
                text="Order"
                rarrow
                onPress={() =>
                  navigation.navigate('OrderHistory', {page: 'Profile'})
                }
              />
              {/* <ProfileBox
                profileimage={icons.order}
                text="Tracking"
                rarrow
                onPress={() => navigation.navigate('Tracking')}
              /> */}
              <ProfileBox
                profileimage={icons.order}
                text="Favourite"
                onPress={() => navigation.navigate('Favorite')}
              />
              <ProfileBox
                profileimage={icons.order}
                text="Delivery Address"
                rarrow
                onPress={() => navigation.navigate('DeliveryAddress')}
              />
              <ProfileBox
                profileimage={icons.order}
                text="Affiliate"
                rarrow
                // onPress={() => navigation.navigate('Affiliate')}
                onPress={() => navigation.navigate('AffiliateCreate')}
              />
            </View>
            <View style={styles.box}>
              <ProfileBox
                profileimage={icons.order}
                text="Notification"
                onPress={() => navigation.navigate('Notification')}
              />
              <ProfileBox
                profileimage={icons.order}
                text="Offer"
                onPress={() =>
                  navigation.navigate('OfferList', {disabledbtn: true})
                }
              />
              <ProfileBox
                profileimage={icons.order}
                text="Contact us"
                onPress={() => navigation.navigate('ContactUs')}
              />
            </View>
            <View style={styles.box}>
              <ProfileBox
                profileimage={icons.order}
                onPress={() => navigation.navigate('PrivacyPolicy')}
                text="Privacy Policy"
                rarrow
              />
              <ProfileBox
                profileimage={icons.order}
                text="Term & Condition"
                rarrow
                onPress={() => navigation.navigate('TermCondition')}
              />
              <ProfileBox
                profileimage={icons.order}
                onPress={() => navigation.navigate('ReturnPolicy')}
                text="Return Policy"
                rarrow
              />
              <ProfileBox
                profileimage={icons.order}
                onPress={() => navigation.navigate('SupportPolicy')}
                text="Support Policy"
                rarrow
              />
            </View>
            <View style={styles.box}>
              <ProfileBox
                profileimage={icons.order}
                onPress={() => setModalVisible(true)}
                text="Logout"
                rarrow
              />
            </View>
            <View>
              <Modal
                isVisible={isModalVisible}
                animationIn={'fadeInDown'}
                backdropOpacity={0.2}>
                <View style={styles.modalbox}>
                  <Text style={styles.modalhead}>Are you want to Logout</Text>
                  <View style={styles.modalbtnrow}>
                    <Button
                      children="No"
                      mediumbtn
                      iconbtn
                      btnStyle={{marginRight: width * 0.07}}
                      onPress={() => setModalVisible(false)}
                    />
                    <Button
                      children="Yes"
                      mediumbtn
                      btnStyle={{
                        width: width * 0.28,
                        height: height * 0.04,
                        borderRadius: 4,
                      }}
                      onPress={() => {
                        LogoutApi(), setModalVisible(false);
                      }}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
const mapStateToProps = state => ({
  token: state.auth.token,
  getuser: state.auth.getuser,
});

const mapDispatchToProps = {LogoutApi, GetuserIdApi, UpdateUserApi};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
