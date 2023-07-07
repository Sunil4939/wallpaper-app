import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.white,
    },
    search:{
       marginHorizontal: SIZES.width * .02,
       marginVertical: SIZES.height * .01,
       height: SIZES.height * .06,
       elevation:10,
       backgroundColor:COLORS.white,
       borderRadius:7,
       paddingLeft:15,
    },
    title:{
        ...FONTS.largeTitle,
        marginVertical: SIZES.height * .01,
        textAlign:'center',
        color:COLORS.black,
    },
})