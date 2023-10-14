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
  person: {
    width: width * 0.32,
    height: width * 0.32,
    borderRadius: width * 0.32,
    resizeMode: 'stretch',
    backgroundColor: COLORS.white,
  },
  camerabox: {
    width: width * 0.07,
    height: width * 0.07,
    position: 'absolute',
    bottom: 8,
    right: 5,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray10,
  },
  camera: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
    tintColor: COLORS.gray70,
  },
  profilebox: {
    alignSelf: 'center',
    marginVertical: height * 0.04,
  },
});
