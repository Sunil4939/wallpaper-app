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
  head: {
    fontSize: 12.5,
    ...FONTS.fiveHundred,
    color: COLORS.gray70,
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: height * 0.04,
  },
  rupe: {
    fontSize: 28,
    ...FONTS.sixHundred,
    color: COLORS.black,
    alignSelf: 'center',
    marginBottom: height * 0.05,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
