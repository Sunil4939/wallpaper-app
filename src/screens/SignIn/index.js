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
import {Formik} from 'formik';
import * as yup from 'yup';
import Register from './../Register/index';
import {OTPApi} from './../../redux/actions/authActions';
const {height, width} = Dimensions.get('window');

const SignIn = ({OTPApi, navigation}) => {
  const [error, setEror] = useState();
  const [loading, setLoading] = useState(false);

  const [postData, setPostData] = useState({
    phoneNumber: null,
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
          label="Enter Phone number"
          placeholder={'Phone no'}
          maxLength={10}
          keyboardType={'numeric'}
          value={postData.phoneNumber}
          // onPressIn={scrollend}
          onChangeText={text => handleChange('phoneNumber', text, setEror(''))}
          inputboxstyle={{marginBottom: height * 0.002}}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </ScrollView>
      <Button
        children="Submit"
        btnStyle={styles.btn}
        load={loading}
        onPress={() => {
          if (postData?.phoneNumber?.length == 10) {
            OTPApi(postData, navigation, true, data => setLoading(data));
            setEror('');
          } else {
            setEror('Please enter valid phone number');
          }
        }}
      />
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  OTPApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
