import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../../../constants';

const H3 = ({children, style}) => {
    return(
        <Text style={[styles.text, style]}>{children}</Text>
    )
}
H3.defaultProps = {
    style: null,
    children: ""
  }
export default H3;

const styles= StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: '400',
        color: COLORS.blackLight
    }
})