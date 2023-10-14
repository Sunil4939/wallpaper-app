import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import StackNavigator from '../navigation/StackNavigator';
import SplashScreen from 'react-native-splash-screen';
import { connect, useSelector, useDispatch } from 'react-redux';
import SignIn from './../screens/SignIn/index';
import OTP from './../screens/otp/index';
import { FONTS, COLORS } from './../constants/theme';
import Onboarding from './../screens/onBoarding/index';
import Register from './../screens/Register/index';
import { GetuserIdApi, InitialCall } from './../redux/actions/authActions';

const Stack = createStackNavigator();

const Root = ({ token, GetuserIdApi, getuser, onboard, InitialCall }) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    InitialCall();
    // GetuserIdApi();
  }, [token]);

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleStyle: styles.headerTitle,
        headerShown: false,
      }}>
      {onboard && <Stack.Screen name="Onboarding" component={Onboarding} />}
      <Stack.Screen name="StackNavigator" component={StackNavigator} />
      {token == null && (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="OTP"
            component={OTP}
            options={{
              headerShown: true,
              title: 'Verification code',
              headerTitleAlign: 'center',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
  getuser: state.auth?.getuser,
  onboard: state.home.onboard,
});

const mapDispatchToProps = {
  GetuserIdApi,
  InitialCall,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);

const styles = StyleSheet.create({
  headerTitle: {
    ...FONTS.sixHundred,
    color: COLORS.black,
    fontSize: 19,
    // textAlign: 'center'
  },
});
