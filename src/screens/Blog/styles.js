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
    //
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.4,
  },
  blog: {
    color: COLORS.gray60,
    fontSize: 14,
    ...FONTS.sixHundred,
    margin: width * 0.01,
  },
  mainbox: {
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagecartempty: {
    width: width * 0.8,
    height: height * 0.45,
    resizeMode: 'cover',
    marginTop: height * 0.08,
  },
  cartempty: {
    fontSize: 20,
    color: COLORS.red,
    fontFamily: FONTS.semiBold,
    alignSelf: 'center',
  },
});
