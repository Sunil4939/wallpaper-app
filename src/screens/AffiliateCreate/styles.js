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
  checktext: {
    color: COLORS.gray60,
    fontSize: 13,
    ...FONTS.fiveHundred,
    marginLeft: width * 0.02,
    marginBottom: -3,
  },
});
