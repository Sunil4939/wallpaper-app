import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import { COLORS, FONTS } from '../../../constants';

const Button1 = ({ onPress, style, children }) => {
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={onPress} style={styles.btn}>
                <Text style={styles.text}>{children}</Text>
            </TouchableOpacity>
        </View>
    )
}

Button1.defaultProps = {
    style: null,
    onPress: null,
    children: "Button"
}
export default Button1;

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center',
        marginBottom: height * .02,
    },

    text: {
        ...FONTS.h3,
        color: COLORS.white,
    },
    btn: {
        backgroundColor: COLORS.green,
        width: width * .92,
        height: height * .06,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 7,
    }
})