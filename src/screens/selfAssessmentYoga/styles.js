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
  orderdone: {
    width: width * 0.6,
    height: height * 0.25,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: height * 0.02,
  },
  content: {
    color: COLORS.gray80,
    fontSize: 13,
    ...FONTS.fiveHundred,
    alignSelf: 'center',
    marginBottom: height * 0.01,
  },
  heading: {
    color: COLORS.gray70,
    fontSize: 15,
    ...FONTS.sixHundred,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: height * 0.02,
  },
  boxheading: {
    color: COLORS.black,
    fontSize: 15,
    ...FONTS.sixHundred,
    marginTop: height * 0.02,
  },
  imageheading: {
    color: COLORS.gray70,
    fontSize: 12,
    ...FONTS.fiveHundred,
  },
  images: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'stretch',
    marginRight: width * 0.03,
    borderRadius: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.6,
  },
  dot: {
    width: width * 0.02,
    backgroundColor: COLORS.gray70,
    height: width * 0.02,
    borderRadius: 20,
    marginRight: width * 0.025,
  },
  dotText: {
    color: COLORS.black,
    fontSize: 14,
    ...FONTS.fiveHundred,
    alignSelf: 'center',
  },
  smallimg: {
    width: width * 0.15,
    height: width * 0.15,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  plus: {
    width: width * 0.04,
    height: width * 0.04,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginVertical: height * 0.012,
  },
  smallimgtext: {
    color: COLORS.black,
    fontSize: 12.5,
    ...FONTS.fiveHundred,
    textAlign: 'center',
  },
  smallimgbox: {
    width: width * 0.3,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
