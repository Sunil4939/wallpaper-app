import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: '#A6F4F326',
    flex: 1,
  },
  innercontainer: {
    backgroundColor: '#A6F4F326',
    alignSelf: 'center',
    width: width * 0.96,
  },
  whitecontainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innerwhitecontainer: {
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    width: width * 0.96,
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
