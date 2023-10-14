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
    width: width * 0.045,
    height: height * 0.028,
    resizeMode: 'contain',
    marginHorizontal: width * 0.025,
    tintColor: COLORS.black,
  },
  profileText: {
    fontSize: 12,
    ...FONTS.fiveHundred,
    color: COLORS.black,
    marginBottom: -3,
  },
  inputfieldbox: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    width: width * 0.96,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.03,
    marginVertical: height * 0.035,
    borderWidth: 1,
    borderColor: COLORS.gray10,
  },
  label: {
    fontSize: 14.5,
    ...FONTS.sixHundred,
    color: COLORS.black,
    marginLeft: width * 0.015,
  },
  mainheading: {
    color: COLORS.red,
    fontSize: 26,
    ...FONTS.sixHundred,
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: height * 0.01,
  },
  heading: {
    color: COLORS.gray80,
    fontSize: 12,
    ...FONTS.fiveHundred,
    alignSelf: 'center',
    width: width * 0.85,
    textAlign: 'center',
    lineHeight: 23,
  },
  rowdrop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.016,
    alignSelf: 'center',
  },

  sendbtn: {
    marginTop: height * 0.02,
    height: height * 0.06,
  },
});
