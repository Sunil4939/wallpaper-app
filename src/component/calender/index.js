import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {FONTS, COLORS, SIZES} from './../../constants/theme';
import {Calendar, CalendarList, CalendarProvider} from 'react-native-calendars';

export const CalenderList = () => {
  return (
    <View>
      <Calendar
        onDayPress={day => {
          console.log('selected day', day);
        }}
        theme={{
          backgroundColor: COLORS.white,
          selectedDayTextColor: COLORS.primary,
          dayTextColor: COLORS.black,
          textDisabledColor: COLORS.gray40,
          arrowColor: COLORS.primary,
          textDayFontFamily: 'Poppins',
          textMonthFontFamily: 'Poppins',
          textDayHeaderFontFamily: 'Poppins',
          textDayFontSize: 14,
          textMonthFontSize: 14,
          textDayHeaderFontSize: 16,
        }}
        style={{
          width: SIZES.width * 0.93,
          alignSelf: 'center',
          backgroundColor: COLORS.white,
          borderWidth: 1,
          borderColor: COLORS.gray10,
          borderRadius: 10,
        }}
      />
    </View>
  );
};
