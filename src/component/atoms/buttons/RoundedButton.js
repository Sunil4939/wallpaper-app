import React from 'react';
import { View,
         Text,
         TouchableOpacity,
         StyleSheet,
         Dimensions
        } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../../constants';
    
let {width, height} = Dimensions.get('screen')
const RoundedButton = ({onPress, style, width,backgroundColor, color1, color2,textColor,children}) => {
    return(
    <TouchableOpacity onPress={onPress}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[color1, color2]} style={[style, styles.button, {backgroundColor: backgroundColor, width: width}]}>
        <Text style={[styles.text, {color: textColor}]}>{children}</Text>
        </LinearGradient>
    </TouchableOpacity>
    )
}

RoundedButton.defaultProps = {
    style: null,
    width: width *.90,
    onPress: null,
    children: "Button",
    backgroundColor: COLORS.primary,
    color1: COLORS.primary,
    color2: COLORS.primary1,
    textColor: COLORS.white
  }
export default RoundedButton;


const styles = StyleSheet.create({
    button: {
        width: width *.90,
        height: height *.07,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        shadowColor: COLORS.primary,
        elevation: 8,
    },
    text: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.white 
    }
})