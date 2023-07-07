import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants';
import Icons from '../Icons';

let HeaderBackButton = ({navigation, color}) => <TouchableOpacity style={styles.btn}
                                                onPress={() => navigation.goBack()} >
                                                    <Icons name="leftArrow" size={24} color={COLORS.black2}/>
                                                </TouchableOpacity>

export default HeaderBackButton;

const styles = StyleSheet.create({
    btn: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: COLORS.white
    }
})