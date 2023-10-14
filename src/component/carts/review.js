import React, {useState} from 'react';
import {Text, View, Image, Dimensions, StyleSheet} from 'react-native';
import {COLORS, FONTS, data, icons, images} from '../../constants';
import Stars from 'react-native-stars';
import * as Progress from 'react-native-progress';

const {width, height} = Dimensions.get('window');

const Review = ({user, rating, count, progress}) => {
  return (
    <View style={styles.starbox}>
      <View style={styles.starstyle}>
        <Stars
          default={rating}
          spacing={5}
          starSize={12}
          count={count}
          fullStar={icons.fillstar}
          style={{alignSelf: 'flex-start'}}
        />
      </View>
      <Text style={styles.usercount}>{user} users</Text>
      <Progress.Bar
        progress={progress}
        width={width * 0.34}
        height={height * 0.01}
        borderRadius={12}
        borderColor="#F5F5F5"
        indeterminate={false}
        unfilledColor={COLORS.gray10}
      />
    </View>
  );
};
Review.defaultProps = {
  count: 1,
};

export default Review;
const styles = StyleSheet.create({
  starbox: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: width * 0.87,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: height * 0.005,
  },
  usercount: {
    fontSize: 11.5,
    fontFamily: FONTS.medium,
    color: COLORS.black,
    width: width * 0.25,
  },
  starstyle: {
    width: width * 0.26,
    alignItems: 'flex-start',
  },
});
