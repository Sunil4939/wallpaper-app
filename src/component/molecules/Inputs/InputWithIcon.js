import React from 'react';
import { Dimensions, 
         StyleSheet, 
         TextInput,
         View
        } from 'react-native';
import { COLORS } from '../../../constants';
import Icons from '../../atoms/Icons';
import Input1 from '../../atoms/inputs/Input1';

const InputWithIcon = ({onChangeText, style, value, placeholder, leftIconName, rightIconName, iconSize, iconColor}) => {
    return(
        <View style={[styles.container, StyleSheet.create(style)]}>
            {leftIconName && <Icons name={leftIconName} color={iconColor} size={iconSize}/>}
            <Input1 style={styles.input1} 
                onChangeText={onChangeText}
                placeholder={placeholder}
                value={value}
            />
            {rightIconName && <Icons name={rightIconName} color={iconColor} size={iconSize}  />}
        </View>
    )
}
InputWithIcon.defaultProps = {
    style: null,
    onChangeText: null,
    placeholder: "",
    leftIconName: null,
    rightIconName: null
}

export default InputWithIcon;

let {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: width * .9,
        minHeight: height * .065,
        padding: 0,
        backgroundColor: COLORS.white2,
        borderRadius: 10,
        paddingLeft: 10
    },
    input1: {
        width: width *.72,
        zIndex: 1
    }
})