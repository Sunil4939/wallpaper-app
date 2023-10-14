import {Dimensions, StyleSheet} from 'react-native';
import {FONTS, COLORS, SIZES} from './../../constants';
export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconbox: {
    width: SIZES.width * 0.135,
    height: SIZES.width * 0.135,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.height * -0.016,
  },
  icon_set: {
    width: SIZES.width * 0.055,
    height: SIZES.height * 0.03,
    resizeMode: 'contain',
  },
  tableBar: {
    height: SIZES.height * 0.076,
    backgroundColor: COLORS.green,
  },
  tablebal: {
    ...FONTS.sixHundred,
    fontSize: 10,
    color: COLORS.white,
  },
  headerstyle: {
    elevation: 0,
    shadowOpacity: 0,
  },
  bell: {
    width: SIZES.width * 0.055,
    height: SIZES.height * 0.045,
    resizeMode: 'contain',
    marginRight: SIZES.width * 0.045,
  },
  logo: {
    width: SIZES.width * 0.34,
    height: SIZES.height * 0.08,
    resizeMode: 'stretch',
  },

  headerTitle: {
    ...FONTS.sixHundred,
    color: COLORS.black,
    fontSize: 19,
  },

  count: {
    fontSize: 10,
    ...FONTS.sixHundred,
    color: COLORS.white,
    borderRadius: 20,
    marginBottom: -2,
  },
  countbox: {
    backgroundColor: COLORS.red,
    width: SIZES.width * 0.05,
    height: SIZES.width * 0.05,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 13,
  },
});
