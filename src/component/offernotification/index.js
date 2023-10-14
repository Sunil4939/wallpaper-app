import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES, icons} from '../../constants';

const OfferNotificationCart = ({
  text1,
  text2,
  image,
  onPress,
  proimg,
  profileimg,
  disabled,
}) => {
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.box1}>
        {profileimg ? (
          <Image source={image} style={styles.profileimg} />
        ) : (
          <View style={styles.imgbox}>
            <Image source={image} style={[styles.img, proimg]} />
          </View>
        )}
        <View>
          <Text
            style={[
              styles.text1,
              profileimg && {marginBottom: SIZES.height * 0.001},
            ]}>
            {text1}
          </Text>
          <Text style={styles.text2}>{text2}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OfferNotificationCart;

const styles = StyleSheet.create({
  box1: {
    width: SIZES.width * 0.92,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.height * 0.02,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },
  imgbox: {
    height: SIZES.width * 0.1,
    width: SIZES.width * 0.1,
    backgroundColor: '#0C6B373D',
    marginRight: SIZES.width * 0.045,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  img: {
    height: SIZES.height * 0.025,
    width: SIZES.width * 0.05,
    resizeMode: 'contain',
  },
  profileimg: {
    height: SIZES.width * 0.13,
    width: SIZES.width * 0.13,
    backgroundColor: COLORS.white,
    marginRight: SIZES.width * 0.03,
    borderRadius: 30,
    resizeMode: 'stretch',
  },
  text1: {
    width: SIZES.width * 0.75,
    ...FONTS.fiveHundred,
    color: COLORS.black,
    fontSize: 13,
    marginBottom: -3,
  },
  text2: {
    width: SIZES.width * 0.75,
    ...FONTS.fourHundred,
    color: COLORS.gray50,
    fontSize: 12,
    marginBottom: -3,
  },
});
