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
    fontSize: 20,
    fontFamily: FONTS.medium,
    color: COLORS.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: height * 0.4,
  },
});
