import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    width: width * 0.94,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },

  text2: {
    fontSize: 13,
    width: width * 0.8,
    fontFamily: FONTS.medium,
    marginTop: height * 0.03,
    color: COLORS.gray80,
    textAlign: 'center',
    alignSelf: 'center',
  },

  box3: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: height * 0.2,
  },
  resend: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.gray60,
    width: width * 0.7,
  },
  time: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    width: width * 0.18,
  },

  otpCheck: {
    width: width * 0.7,
    height: height * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  underlineStyleBase: {
    width: width * 0.13,
    height: height * 0.06,
    borderRadius: 12,
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
    backgroundColor: '#F7F7F7',
    fontSize: 19,
    paddingBottom: width * 0.015,
  },
  underlineStyleHighLighted: {
    borderColor: COLORS.red,
  },
  resent: {
    color: COLORS.red,
    textDecorationLine: 'underline',
    fontSize: 14,
    ...FONTS.fiveHundred,
  },
});
