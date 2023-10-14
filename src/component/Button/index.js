import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from './../../constants';

const Button = ({
  onPress,
  mediumbtn,
  children,
  roundbtn,
  iconbtn,
  iconbtnICON,
  aadtocartBtn,
  roundsmallbtn,
  btnStyle,
  btntextStyle,
  load,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      disabled={disabled}
      style={[
        styles.longButton,
        mediumbtn && {width: SIZES.width * 0.4, height: SIZES.height * 0.053},
        roundbtn && {
          borderRadius: 40,
          height: SIZES.height * 0.05,
          width: SIZES.width * 0.88,
        },
        roundsmallbtn && {
          borderRadius: 50,
          width: SIZES.width * 0.35,
          height: SIZES.height * 0.045,
        },
        iconbtn && {
          width: SIZES.width * 0.28,
          height: SIZES.height * 0.04,
          borderWidth: 0.6,
          borderRadius: 4,
          borderColor: COLORS.red,
          backgroundColor: COLORS.lightpink,
        },
        aadtocartBtn && {
          width: SIZES.width * 0.38,
          height: SIZES.height * 0.036,
          alignSelf: 'center',
          backgroundColor: COLORS.green,
          borderWidth: 0,
        },
        btnStyle,
      ]}>
      {(aadtocartBtn || iconbtnICON) && (
        <Image
          source={icons.bottomcart}
          style={[styles.icon, aadtocartBtn && {tintColor: COLORS.white}]}
        />
      )}
      {load && (
        <View style={styles.indBox}>
          <ActivityIndicator size={SIZES.width * 0.065} color={COLORS.white} />
        </View>
      )}
      <Text
        style={[
          styles.buttonText,
          roundsmallbtn && {
            fontSize: 12,
          },
          roundbtn && {
            fontSize: 13,
          },
          iconbtn && {
            fontSize: 12,
            color: COLORS.red,
            marginTop: -2,
          },
          aadtocartBtn && {
            color: COLORS.white,
            ...FONTS.fiveHundred,
            fontSize: 12,
          },
          btntextStyle,
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  longButton: {
    backgroundColor: COLORS.red,
    width: SIZES.width * 0.92,
    height: SIZES.height * 0.065,
    borderRadius: 6,
    justifyContent: 'center',
    marginTop: SIZES.height * 0.005,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: SIZES.width * 0.05,
    height: SIZES.height * 0.04,
    resizeMode: 'contain',
    marginRight: SIZES.width * 0.02,
    tintColor: COLORS.red,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: 'center',
    ...FONTS.sixHundred,
    fontSize: 14,
    marginBottom: -4,
  },
  indBox: {marginLeft: SIZES.width * -0.03, marginRight: SIZES.width * 0.02},
});
export default Button;
