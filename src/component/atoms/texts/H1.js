import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../../../constants';

const H1 = ({children, style}) => {
    return(
        <Text style={[styles.text, style]}>{children}</Text>
    )
}
H1.defaultProps = {
    style: null,
    children: ""
  }
export default H1;

const styles= StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: '600',
        color: COLORS.black
    }
})