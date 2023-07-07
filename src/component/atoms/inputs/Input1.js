import React from 'react';
import { Dimensions, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../../../constants';

const Input1 = ({onChangeText, style, value, placeholder}) => {
    return(
        <TextInput 
            placeholder={placeholder}
            placeholderTextColor={COLORS.gray}
            style={[StyleSheet.create(style), styles.input]} 
            onChangeText={onChangeText}
            value={value}
        />
    )
}
Input1.defaultProps = {
    style: null,
    onChangeText: null,
    placeholder: ""
}

export default Input1;

let width = Dimensions.get('screen').width
let height = Dimensions.get('screen').height

const styles = StyleSheet.create({
    input: {
        backgroundColor: COLORS.white2,
        borderRadius: 7,
        height: height *.06,
        paddingLeft: 20
    }
})