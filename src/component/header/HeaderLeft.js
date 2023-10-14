import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { COLORS, FONTS, SIZES, icons } from '../../constants'

const HeaderLeft = ({ onPress, title }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.row}>
      <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={onPress ? onPress : () => navigation.goBack()}>
        <Image source={icons.back} style={styles.back} />
      </TouchableOpacity>
      {/* <Text style={styles.title}>{title}</Text> */}
    </View>
  )
}

export default HeaderLeft

const styles = StyleSheet.create({
  back: {
    width: SIZES.width * .062,
    height: SIZES.width * .07,
    resizeMode: 'contain',
  },
  btn: {
    width: SIZES.width * .1,
    height: SIZES.width * .08,
    // alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    marginLeft: SIZES.width * .03,
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .05,
    color: COLORS.black,
    marginBottom: -4,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})