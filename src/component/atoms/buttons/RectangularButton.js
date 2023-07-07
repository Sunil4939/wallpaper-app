import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../../constants';

const RectangularButton = ({ onPress, style, children }) => {
    return (
        <TouchableOpacity onPress={onPress} >
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[COLORS.primary, COLORS.primary1]} style={[style, styles.button]}>
                <Text style={styles.text}>{children}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

RectangularButton.defaultProps = {
    style: null,
    onPress: null,
    children: "Button"
}
export default RectangularButton;

let width = Dimensions.get('screen').width
let height = Dimensions.get('screen').height

const styles = StyleSheet.create({
    button: {
        width: width * .90,
        height: height * .07,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    text: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.white
    }
})