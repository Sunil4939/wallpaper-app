import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  maincontainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    alignSelf: 'center',
    width: width * 0.94,
    backgroundColor: COLORS.white,
  },
  tectimonialBox: {
    width: width * 0.7,
    alignSelf: 'center',
    paddingTop: height * 0.06,
    marginBottom: height * 0.03,
  },
  tectimonialboximg: {
    height: width * 0.27,
    width: width * 0.27,
    borderRadius: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    position: 'absolute',
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  tectimonialimg: {
    height: width * 0.27,
    width: width * 0.27,
    borderRadius: 100,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  tectimonialBox2: {
    elevation: 3,
    width: width * 0.7,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingTop: height * 0.06,
    paddingBottom: height * 0.02,
  },
  tectimonialtitle: {
    fontSize: 15,
    ...FONTS.fiveHundred,
    color: COLORS.black,
    alignSelf: 'center',
    marginTop: height * 0.016,
    width: width * 0.5,
    textAlign: 'center',
  },
  tectimonialtitle2: {
    fontSize: 13,
    ...FONTS.fourHundred,
    color: COLORS.black,
    alignSelf: 'center',
    width: width * 0.5,
    textAlign: 'center',
    marginTop: height * 0.01,
    lineHeight: 25,
    height: height * 0.18,
  },
  star: {
    marginVertical: height * 0.008,
  },
});
