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
  greentext: {
    color: COLORS.green,
    fontSize: 15,
    ...FONTS.fiveHundred,
    marginVertical: height * 0.01,
    alignSelf: 'center',
  },

  profileBoxStyle: {
    borderWidth: 1,
    borderColor: COLORS.gray10,
    paddingHorizontal: width * 0.02,
    paddingVertical: width * 0.015,
    width: width * 0.92,
    borderRadius: 8,
    marginBottom: height * 0.05,
  },
  orderdone: {
    width: width * 0.6,
    height: height * 0.25,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: height * 0.01,
  },

  downloadbox: {
    borderWidth: 1,
    borderColor: COLORS.gray10,
    paddingHorizontal: width * 0.04,
    height: height * 0.056,
    width: width * 0.92,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.01,
    alignSelf: 'center',
    borderRadius: 8,
  },

  downloadicon: {
    height: height * 0.02,
    width: width * 0.04,
    resizeMode: 'contain',
    tintColor: COLORS.black,
  },
  text: {
    width: width * 0.75,
    ...FONTS.fiveHundred,
    color: COLORS.black,
    fontSize: 14,
    marginBottom: -3,
  },
  btnstyle: {
    marginBottom: height * 0.03,
    marginTop: height * 0.02,
    alignSelf: 'center',
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
