import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    width: width * 0.95,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },
  box: {
    elevation: 4,
    backgroundColor: COLORS.white,
    width: width * 0.94,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: height * 0.01,
    paddingVertical: height * 0.01,
  },
  greenbox: {
    backgroundColor: '#0C6B3791',
    width: width * 0.94,
    alignSelf: 'center',
    borderRadius: 8,
    marginVertical: height * 0.015,
    paddingVertical: height * 0.015,
    paddingHorizontal: height * 0.02,
    flexDirection: 'row',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  person: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: 60,
    resizeMode: 'contain',
    backgroundColor: COLORS.white,
  },
  persontext: {
    fontSize: 13.5,
    color: COLORS.white,
    ...FONTS.fiveHundred,
    width: width * 0.58,
    marginLeft: width * 0.05,
  },
  edit: {
    width: width * 0.06,
    height: width * 0.06,
    tintColor: COLORS.white,
    resizeMode: 'contain',
  },
});
