import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import Button from '../../component/Button';
import {connect} from 'react-redux';
import styles from './styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import StackNavigator from './../../navigation/StackNavigator/index';
import {OTPApi, SignUpApi, LoginApi} from './../../redux/actions/authActions';
import {RNToasty} from 'react-native-toasty';

const {height, width} = Dimensions.get('window');

const OTP = ({OTPApi, navigation, LoginApi, SignUpApi, route}) => {
  const otp = route.params.otp;
  const check = route.params.check;
  const data = route.params.data;
  const [loading, setLoading] = useState(false);
  const [currtime, setcurrtime] = useState(30);

  useEffect(() => {
    countdown();
  }, []);

  const countdown = () => {
    var timeLeft = 30;
    var timerId = setInterval(countdown, 1000);
    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
      } else {
        setcurrtime(timeLeft);
        timeLeft--;
      }
    }
  };
  const resendOtp = () => {
    OTPApi(data, navigation, check);
    countdown();
  };

  const handleSubmit = code => {
    if (otp == code) {
      if (check) {
        LoginApi(data, data => setLoading(data));
        console.log('login');
      } else {
        SignUpApi(data, data => setLoading(data));
        console.log('SignUp');
      }
    } else {
      RNToasty.Error({
        title: 'Please enter valid Otp',
      });
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />

      <View style={styles.innercontainer}>
        <Text style={styles.text2}>
          We just sent you a 4 digit verification code. Check your inbox to get
          them.
        </Text>

        <OTPInputView
          style={styles.otpCheck}
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            // setOtpCheck(code);
            handleSubmit(code);
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />

        <View style={styles.box3}>
          {currtime == 0 ? null : (
            <Text style={styles.resend}>Resend the OTP in</Text>
          )}
          {currtime == 0 ? (
            <TouchableOpacity onPress={resendOtp}>
              <Text style={styles.resent}>Resend</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.time}>0 : {currtime} sec</Text>
          )}
        </View>
        <Button
          children="Submit"
          btnStyle={{alignSelf: 'center'}}
          load={loading}
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {OTPApi, SignUpApi, LoginApi};

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
