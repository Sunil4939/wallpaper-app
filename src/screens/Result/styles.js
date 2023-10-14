import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    width: width * 0.94,
  },

  modaldata: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 15,
    height: height * 0.035,
    width: width * 0.21,
    marginTop: height * 0.012,
    marginRight: width * 0.032,
  },
  text6: {
    marginTop: height * 0.02,
    color: COLORS.black,
    fontSize: 15,
    ...FONTS.sixHundred,
    marginLeft: width * 0.01,
  },
  Timetext: {fontSize: 11.5, ...FONTS.fiveHundred, marginBottom: -3},
});
