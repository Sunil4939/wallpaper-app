import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../constants';

const Wallpaper = ({source, onPress}) => {
  return (
    <TouchableOpacity style={styles.imageBox} onPress={onPress}>
    <Image  source={{uri:source}} style={styles.image} resizeMode="contain" />
    </TouchableOpacity>
  )
}

Wallpaper.defaultProps = {
  style: null,
  onPress: null,
}
export default Wallpaper;

const styles = StyleSheet.create({
    imageBox:{
        width: SIZES.width * .46,
        height: SIZES.height * .18,
        backgroundColor:COLORS.white,
        elevation:10,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal: SIZES.width * .015,
        marginVertical: SIZES.height * .01,
        borderRadius:5,
    },
    image:{
        width: SIZES.width * .4,
        height: SIZES.height * .2,
    },
})