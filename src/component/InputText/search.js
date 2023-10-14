import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES, icons} from '../../constants';

const {width, height} = Dimensions.get('window');

const SearchBox = ({
  placeholder,
  searchStyle,
  editable,
  searchbox,
  onPressfilter,
  disabled,
  onPresssearch,
  disabledfilter,
  onChangeText,
  value,
  filter,
  autoFocus,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPresssearch}
      activeOpacity={0.6}
      style={[
        styles.searchbox,
        searchStyle,
        searchbox && {borderColor: COLORS.red, backgroundColor: COLORS.white},
      ]}>
      <Image source={icons.search} style={styles.search} />
      <TextInput
        editable={editable}
        placeholder={placeholder}
        style={styles.searchinput}
        placeholderTextColor={COLORS.gray80}
        onChangeText={onChangeText}
        value={value}
        autoFocus={autoFocus}
      />

      {filter ? null : (
        <TouchableOpacity disabled={disabledfilter} onPress={onPressfilter}>
          <Image
            source={icons.filter}
            style={[styles.search, {tintColor: COLORS.gray80}]}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  searchbox: {
    height: height * 0.057,
    width: width * 0.93,
    marginVertical: height * 0.02,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1.2,
    borderRadius: 8,
    backgroundColor: COLORS.gray10,
    borderColor: COLORS.gray30,
  },
  search: {
    height: height * 0.03,
    width: width * 0.06,
    marginHorizontal: width * 0.03,
    resizeMode: 'contain',
    tintColor: COLORS.gray40,
  },

  searchinput: {
    width: width * 0.66,
    fontFamily: FONTS.medium,
    fontSize: 14,
    marginBottom: -3,
  },
});
