import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
// import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';

import styles from './styles';
import Button1 from '../../component/atoms/buttons/Button1';

const WallPaper = ({ route }) => {
  const src = route.params.source;
  // console.log(src);


  return (
    <View style={styles.container}>
      <Image source={{ uri: src.original }} style={styles.image} resizeMode="stretch" />
      <View style={styles.btnContainer}>
        <Button1 >
          Set HomeScreen
        </Button1>
        <Button1 >
          Set LockScreen
        </Button1>
      </View>
    </View>
  )
}

export default WallPaper;