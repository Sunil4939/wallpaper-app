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
    width: width * 0.92,
  },
  stepRow: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  steplabel: {
    color: COLORS.black,
    ...FONTS.sixHundred,
    fontSize: 13,
    // marginBottom: -3,
    // paddingLeft: width * 0.03,
  },
  hrs: {
    color: COLORS.black,
    ...FONTS.fourHundred,
    fontSize: 11,
    marginBottom: -4,
    marginTop: height * -0.008,
  },
  stepLabelBox: {
    height: height * 0.1, //1 + == stepheight +4
    justifyContent: 'center',
    paddingLeft: width * 0.02,
    marginTop: height * 0.01,
  },
  StepIndicatorBox: {
    height: height * 0.45,
  },
  border: {
    borderLeftWidth: 3,
    borderColor: COLORS.green,
    height: height * 0.05,
    position: 'absolute',
    left: width*.017,
    bottom: height*.34,
  },
});
