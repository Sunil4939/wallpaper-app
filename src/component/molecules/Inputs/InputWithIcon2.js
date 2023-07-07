import React from 'react';
import { Dimensions, 
         StyleSheet, 
         TextInput,
         View
        } from 'react-native';
import { COLORS } from '../../../constants';
import Icons from '../../atoms/Icons';
import Input1 from '../../atoms/inputs/Input1';
import H3 from '../../atoms/texts/H3';

const InputWithIcon2 = ({onChangeText, style, value, placeholder, leftIconName, rightIconName, iconSize, iconColor, unit}) => {
    return(
        <View style={styles.parentContainer}>
        <View style={[styles.container, StyleSheet.create(style)]}>
            {leftIconName && <Icons name={leftIconName} color={iconColor} size={iconSize}/>}
            <Input1 style={styles.input1} 
                onChangeText={onChangeText}
                placeholder={placeholder}
                value={value}
            />
        </View>
        <View style={styles.btn}>
            <H3 style={styles.unit}>{unit}</H3>
        </View>
        </View>
    )
}
InputWithIcon2.defaultProps = {
    style: null,
    onChangeText: null,
    placeholder: "",
    leftIconName: null,
    rightIconName: null,
    unit: null
}

export default InputWithIcon2;

let width = Dimensions.get('screen').width
let height = Dimensions.get('screen').height

const styles = StyleSheet.create({
    parentContainer: {
        flexDirection: "row",
        width: width * .9,
        alignItems: "center",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: width * .705,
        minHeight: height * .065,
        // padding: 0,
        backgroundColor: COLORS.white2,
        borderRadius: 10,
        paddingLeft: 10,
        marginRight: 10,
        marginBottom: 12
    },
    input1: {
        // width: width *.65,
    },
    btn: {
        backgroundColor:COLORS.secondary,
        width: width * .17,
        alignItems: "center",
        justifyContent: "center",
        height: height * .065,
        borderRadius: 10,
    },
    unit: {
        color: COLORS.white
    }
})