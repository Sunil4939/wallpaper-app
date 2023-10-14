import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS, SIZES} from './../../constants/index';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innerContainer: {
    backgroundColor: COLORS.white,
    width: width * 0.9,
    alignSelf: 'center',
  },

  mainImg: {
    width: width * 0.96,
    height: height * 0.45,
    alignSelf: 'center',
    resizeMode: 'stretch',
    marginVertical: height * 0.05,
  },

  thanku: {
    color: '#005C0F',
    ...FONTS.sevenHundred,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 35,
  },
});
