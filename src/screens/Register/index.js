import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, images, icons, data} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import InputBox from './../../component/InputText/index';
import Button from './../../component/Button/index';
import OTP from './../otp/index';
import {OTPApi} from './../../redux/actions/authActions';
const {height, width} = Dimensions.get('window');

const Register = ({OTPApi, route, navigation}) => {
  const phoneno = route.params?.phoneNumber;
  const [error, setEror] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    fullName: null,
    phoneNumber: phoneno,
    hashKey: 'ITZHASHKEY',
  });
  const handleChange = (name, value) => {
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.innercontainer}>
        <Image source={images.logo} style={styles.logo} />
        <InputBox
          label="Full name"
          placeholder={'Full name'}
          onChangeText={text => handleChange('fullName', text, setEror(''))}
          value={postData.fullName}
          inputboxstyle={{marginBottom: height * 0.002}}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <InputBox
          label="Phone number"
          placeholder={'Mobile no'}
          maxLength={10}
          keyboardType={'numeric'}
          value={postData.phoneNumber}
          editable={false}
          labelStyle={{marginTop: height * 0.02}}
        />
      </ScrollView>
      <Button
        children={'Submit'}
        btnStyle={styles.btn}
        load={loading}
        onPress={() => {
          if (postData.fullName) {
            OTPApi(postData, navigation, false, data => setLoading(data));
          } else {
            setEror('Please enter Full name');
          }
        }}
      />
    </View>
  );
};

const mapStateToProps = state => ({});
const mapDispatchToProps = {OTPApi};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
