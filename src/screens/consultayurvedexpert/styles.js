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
  pinkBox: {
    backgroundColor: COLORS.lightpink,
    borderRadius: 14,
    paddingHorizontal: width * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.03,
    marginTop: height * 0.02,
  },
  text1: {
    color: COLORS.gray70,
    fontSize: 14,
    ...FONTS.sixHundred,
    marginBottom: height * 0.01,
  },
  text2: {
    color: COLORS.gray60,
    fontSize: 13,
    ...FONTS.fiveHundred,
    width: width * 0.85,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: height * 0.02,
  },
});
