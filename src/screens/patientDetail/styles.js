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
    width: width * 0.8,
    height: height * 0.32,
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
  pinkBox: {
    backgroundColor: COLORS.lightpink,
    borderRadius: 14,
    paddingHorizontal: width * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.02,
    marginVertical: height * 0.035,
  },
  label: {
    fontSize: 14.5,
    ...FONTS.sixHundred,
    color: COLORS.black,
    marginLeft: width * 0.015,
  },
  heading: {
    color: COLORS.gray80,
    fontSize: 13.5,
    ...FONTS.fiveHundred,
    alignSelf: 'center',
    marginBottom: height * 0.02,
  },
  rowdrop: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: height * 0.01,
  },
});
