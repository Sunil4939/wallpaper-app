import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {COLORS, FONTS} from './../../constants';
import {icons, images} from './../../constants';
const {width, height} = Dimensions.get('window');

const HeadingSeeAll = ({onPress, heading, seeAll , center}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.leftText}>{heading}</Text>
      {seeAll == true && 
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.rightText}>See All</Text>
        </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.028,
    marginTop: height * 0.02,
    alignItems: 'center',
    marginBottom: height * 0.007,
  },
  rightText: {
    fontSize: 14,
    ...FONTS.sixHundred,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  leftText: {
    fontSize: 15,
    ...FONTS.sixHundred,
    color: COLORS.black,
  },
});

export default HeadingSeeAll;
