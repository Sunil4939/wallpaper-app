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

  oneImg: {
    width: width,
    height: height * 0.24,
    resizeMode: 'stretch',
    alignSelf: 'center',
    borderRadius: 0,
    marginVertical: height * 0.015,
  },
  exploretitle: {
    fontSize: 14,
    ...FONTS.sixHundred,
    color: COLORS.black,
  },
  exploretitle2: {
    fontSize: 12,
    ...FONTS.fiveHundred,
    color: COLORS.black,
    marginVertical: height * 0.01,
  },
});
