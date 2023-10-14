import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    width: width * 0.93,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },
  heading: {
    color: COLORS.gray80,
    fontSize: 13,
    ...FONTS.fiveHundred,
    alignSelf: 'center',
    width: width * 0.85,
    textAlign: 'center',
    marginTop: height * 0.01,
  },
  boxheading: {
    color: COLORS.black,
    fontSize: 15,
    ...FONTS.sixHundred,
    marginTop: height * 0.02,
  },
  imageheading: {
    color: COLORS.gray70,
    fontSize: 12,
    ...FONTS.fiveHundred,
    width: width * 0.8,
  },
  images: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'stretch',
    marginRight: width * 0.03,
    borderRadius: 30,
  },
  rowdirection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.014,
  },
});
