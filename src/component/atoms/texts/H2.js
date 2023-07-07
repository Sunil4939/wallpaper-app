import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../../../constants';

const H2 = ({children, style}) => {
    return(
        <Text style={[styles.text, style]}>{children}</Text>
    )
}
H2.defaultProps = {
    style: null,
    children: ""
  }
export default H2;

const styles= StyleSheet.create({
    text: {
        fontSize: 22,
        fontWeight: '600',
        color: COLORS.black
    }
})