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
  rate: {
    color: COLORS.black,
    fontSize: 15,
    ...FONTS.sixHundred,
    alignSelf: 'center',
    marginTop: height * 0.01,
  },
  skip: {
    color: '#12A43B',
    fontSize: 15,
    ...FONTS.sixHundred,
    alignSelf: 'center',
    marginVertical: height * 0.03,
  },
});
