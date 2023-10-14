import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    width: width * 0.95,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },

  mainbox: {
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagecartempty: {
    width: width * 0.8,
    height: height * 0.48,
    resizeMode: 'contain',
    marginTop: height * 0.08,
    marginBottom: height * 0.04,
  },
  cartempty: {
    fontSize: 20,
    color: COLORS.red,
    fontFamily: FONTS.semiBold,
    alignSelf: 'center',
  },
});
