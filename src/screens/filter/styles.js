import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    //  alignItems: 'center',
    //  marginBottom: height * 0.01,
  },
  heightborder: {
    borderRightWidth: 1,
    borderColor: COLORS.gray10,
    height: height * 0.83,
    width: width * 0.3,
  },
  categoriesbox: {
    width: width * 0.3,
    paddingLeft: width * 0.03,
    justifyContent: 'center',
    marginTop: height * 0.01,
    height: height * 0.06,
  },
  categories: {
    color: COLORS.black,
    fontSize: 15,
    ...FONTS.sixHundred,
  },
  checktext: {
    color: COLORS.gray80,
    fontSize: 13,
    ...FONTS.fiveHundred,
    marginLeft: width * 0.02,
    marginBottom: -3,
  },
  boxcheck: {
    // borderWidth: 1,
    marginTop: height * 0.02,
    width: width * 0.6,
    marginLeft: width * 0.05,
  },
  rowbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: height * 0.015,
    borderTopWidth: 1,
    borderColor: COLORS.gray10,
    paddingTop: height * 0.015,
    backgroundColor: COLORS.white,
  },
  arrow: {
    width: width * 0.028,
    height: height * 0.018,
    resizeMode: 'cover',
    marginTop: 2,
  },
  arrowtext: {
    color: COLORS.black,
    fontSize: 14,
    ...FONTS.sixHundred,
    marginLeft: width * 0.02,
  },
  reset: {
    borderWidth: 0.6,
    borderColor: COLORS.red,
    backgroundColor: COLORS.white,
  },
});
