import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES, icons} from '../../constants';

const ProfileBox = ({text, profileimage, onPress,profileBoxStyle, protext, proimg, rarrow}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.box1, profileBoxStyle]}>
        <View style={styles.imgbox}>
          <Image source={profileimage} style={[styles.img, proimg]} />
        </View>
        <Text style={[styles.text, protext]}>{text}</Text>
        {rarrow && <Image source={icons.rarrow} style={styles.arrow} />}
      </View>
    </TouchableOpacity>
  );
};

export default ProfileBox;

const styles = StyleSheet.create({
  box1: {
    width: SIZES.width * 0.87,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.height * 0.008,
    alignSelf: 'center',
    // borderWidth:1
    // backgroundColor: COLORS.white,
  },
  imgbox: {
    height: SIZES.width * 0.09,
    width: SIZES.width * 0.09,
    backgroundColor: COLORS.lightgray,
    marginRight: SIZES.width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  img: {
    height: SIZES.height * 0.02,
    width: SIZES.width * 0.05,
    resizeMode: 'contain',
  },
  arrow: {
    height: SIZES.height * 0.023,
    width: SIZES.width * 0.05,
    resizeMode: 'contain',
    tintColor: COLORS.black,
  },
  text: {
    width: SIZES.width * 0.68,
    ...FONTS.fiveHundred,
    color: COLORS.black,
    fontSize: 14,
    marginBottom: -3,
  },
});
