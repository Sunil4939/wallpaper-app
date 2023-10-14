import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  sliderimgstyle: {
    width: width * 0.94,
    height: height * 0.19,
    borderRadius: 0,
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.4,
  },
});
