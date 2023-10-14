import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS, FONTS, SIZES} from './../../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DropdownComponent = ({
  data,
  placeholder,
  dropdownStyle,
  containStyle,
  onChange,
}) => {
  // const [value, setValue] = useState(null);

  return (
    <View>
      <Dropdown
        style={[styles.dropdown, dropdownStyle]}
        containerStyle={[styles.containerStyle, containStyle]}
        placeholderStyle={styles.placeholderStyle}
        // iconStyle={styles.iconStyle}
        itemTextStyle={styles.itemTextStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        showsVerticalScrollIndicator={false}
        maxHeight={180}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        onChange={onChange}
        renderRightIcon={() => <FontAwesome name="angle-down" size={25} />}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: SIZES.height * 0.056,
    width: SIZES.width * 0.92,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: SIZES.width * 0.03,
    borderWidth: 1,
    borderColor: COLORS.gray20,
    alignSelf: 'center',
    marginBottom: SIZES.height * 0.015,
  },
  selectedTextStyle: {
    color: COLORS.black,
    fontSize: 13,
    ...FONTS.fiveHundred,
  },
  containerStyle: {
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  itemTextStyle: {
    color: COLORS.black,
    fontSize: 13,
    ...FONTS.fiveHundred,
    marginVertical: SIZES.height * -0.01,
  },
  placeholderStyle: {
    ...FONTS.fiveHundred,
    fontSize: 13,
    color: COLORS.gray90,
  },
});
