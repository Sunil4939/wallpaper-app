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
  modalloginbox: {
    width: width * 0.75,
    marginTop: height * -0.012,
    paddingVertical: height * 0.035,
  },
  blog: {
    color: COLORS.gray60,
    fontSize: 14,
    ...FONTS.sixHundred,
    margin: width * 0.01,
  },
  imagecartempty: {
    width: width * 0.92,
    height: height * 0.45,
    resizeMode: 'contain',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height * 0.13,
    justifyContent: 'center',
  },
});
