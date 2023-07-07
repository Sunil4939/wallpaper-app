import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    image: {
        width: SIZES.width,
        height: SIZES.height,
    },
    btnContainer:{
        position:'absolute',
        bottom:0,
    },
})