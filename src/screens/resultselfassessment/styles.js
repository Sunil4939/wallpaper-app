import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },

  heading: {
    color: COLORS.black,
    fontSize: 15,
    ...FONTS.sixHundred,
    marginTop: height * 0.02,
    marginLeft: width * 0.05,
  },
  mainheading: {
    color: COLORS.gray70,
    fontSize: 15,
    ...FONTS.sixHundred,
    alignSelf: 'center',
    marginTop: height * 0.01,
    textAlign: 'center',
    width: width * 0.9,
  },

  patientsubhead: {
    color: COLORS.gray60,
    fontSize: 13,
    ...FONTS.fiveHundred,
    width: width * 0.7,
  },
  patienthead: {
    color: COLORS.gray60,
    fontSize: 13,
    ...FONTS.fiveHundred,
    width: width * 0.23,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  marginLeft: {
    marginLeft: width * 0.05,
  },
  orderdone: {
    width: width * 0.6,
    height: height * 0.25,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: height * 0.02,
  },
  redtext: {
    color: COLORS.red,
    fontSize: 22,
    ...FONTS.sixHundred,
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: height * 0.01,
  },
  profileimg: {
    width: width * 0.7,
    height: height * 0.3,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: height * 0.02,
  },
  content:{
    color: COLORS.gray80,
    fontSize: 12,
    ...FONTS.fiveHundred,
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: height * 0.01,
    width: width * 0.94,
  },
  dot: {
    width: width * 0.02,
    backgroundColor: COLORS.gray70,
    height: width * 0.02,
    borderRadius: 20,
    marginRight: width * 0.025,
    marginTop: width * 0.016,
  },
  dotText: {
    color: COLORS.gray70,
    fontSize: 14,
    ...FONTS.fiveHundred,
    alignSelf: 'center',
  },
  dotrow: {
    flexDirection: 'row',
  },
});
