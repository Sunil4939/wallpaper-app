import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  maincontainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    alignSelf: 'center',
    width: width * 0.94,
    backgroundColor: COLORS.white,
  },
  textcondition: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    lineHeight: width * 0.07,
    marginBottom: height * 0.02,
    alignSelf: 'center',
  },
});
