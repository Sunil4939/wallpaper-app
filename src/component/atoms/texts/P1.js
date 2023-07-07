import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../../../constants';

const P1 = ({children, style}) => {
    return(
        <Text style={[styles.text, style]}>{children}</Text>
    )
}
P1.defaultProps = {
    style: null,
    children: ""
  }
export default P1;

const styles= StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: '400',
        color: COLORS.black
    }
})