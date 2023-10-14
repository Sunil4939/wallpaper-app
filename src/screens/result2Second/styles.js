import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    width: width * 0.96,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },
  profileimg: {
    width: width * 0.7,
    height: height * 0.3,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: height * 0.015,
  },
  profileicons: {
    width: width * 0.04,
    height: height * 0.025,
    resizeMode: 'contain',
    marginHorizontal: width * 0.025,
    tintColor: COLORS.gray60,
  },
  profileText: {
    fontSize: 12,
    ...FONTS.fiveHundred,
    color: COLORS.black,
    width: width * 0.85,
  },
  heading: {
    color: COLORS.gray90,
    fontSize: 15,
    ...FONTS.sixHundred,
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  rowdrop: {
    flexDirection: 'row',
    marginTop: height * 0.01,
  },
});
