import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  headerTitle: {
    ...FONTS.sixHundred,
    color: COLORS.black,
    fontSize: 18,
  },
  headerstyle: {
    elevation: 0,
    shadowOpacity: 0,
  },
});
