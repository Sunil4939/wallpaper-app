import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
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
    fontSize: 12,
    ...FONTS.fiveHundred,
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: height * 0.01,
    width: width * 0.94,
  },
  heading: {
    color: COLORS.gray70,
    fontSize: 15,
    ...FONTS.sixHundred,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: height * 0.02,
    width: width * 0.95,
  },
  boxheading: {
    color: COLORS.black,
    fontSize: 15,
    ...FONTS.sixHundred,
    marginTop: height * 0.02,
    width: width * 0.95,
    marginLeft:width * 0.03
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
});
