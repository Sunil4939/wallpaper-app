import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {icons, images, COLORS, FONTS, SIZES} from './../../constants';

const Category = ({
  img,
  text,
  categoryboxstyle,
  onPress,
  categoryimgboxstyle,
}) => {
  return (
    <View style={[styles.categorybox, categoryboxstyle]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.categoryimgbox, categoryimgboxstyle]}
        activeOpacity={0.6}>
        <Image source={img} style={styles.categoryimg} />
      </TouchableOpacity>
      <Text style={styles.categoryText}>{text}</Text>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  categorybox: {
    backgroundColor: COLORS.white,
    width: SIZES.width * 0.4,
    marginBottom: SIZES.width * 0.02,
  },
  categoryimgbox: {
    width: SIZES.width * 0.4,
    height: SIZES.height * 0.18,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.skyblue,
  },
  categoryimg: {
    width: SIZES.width * 0.26,
    height: SIZES.height * 0.12,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  categoryText: {
    color: COLORS.black,
    fontSize: 13,
    textAlign: 'center',
    alignSelf: 'center',
    ...FONTS.fiveHundred,
    marginVertical: SIZES.height * 0.01,
  },
});
