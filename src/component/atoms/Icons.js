import React from "react"

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import Octicons from 'react-native-vector-icons/Octicons'
import { Image, StyleSheet } from "react-native"




const Icons = ({name, color, size, style}) => {
    switch (name) {

        case 'workout':
            return <Image source={require('../../assets/icons/workout.png')} 
                        size={size} color={color} 
                        style={[{tintColor: color}, style]}
                    /> 

        case 'nutrition':
            return <Image source={require('../../assets/icons/nutrition.png')} 
                        size={size} color={color} 
                        style={[{tintColor: color}, style]}
                    />
        case 'google':
            return <Image source={require('../../assets/icons/google.png')} 
                        size={size} color={color} 
                        style={[{tintColor: color}, style]}
                    /> 
        case 'facebook':
            return <Image source={require('../../assets/icons/facebook.png')} 
                        size={size} color={color} 
                        style={[{tintColor: color}, style]}
                    /> 
        case 'userIcon':
            return <Image source={require('../../assets/icons/icon-user.png')} 
                        size={size} color={color} 
                        style={[{tintColor: color}, style]}
                    />
        case 'user':
            return <FontAwesome style={StyleSheet.create(style)} name="user-o" size={size} color={color} />
        
        case 'mail':
            return <MaterialIcons style={StyleSheet.create(style)} name="mail-outline" size={size} color={color} />
            
        case 'lock':
            return <SimpleLineIcons style={StyleSheet.create(style)} name="lock" size={size} color={color} />
        
        case 'arrow-switch':
            return <Octicons style={StyleSheet.create(style)} name="arrow-switch" size={size} color={color} />
        
        case 'rightArrow':
            return <MaterialCommunityIcons style={StyleSheet.create(style)} name="chevron-right" size={size} color={color} />
        
        case 'checkmark':
            return <Ionicons style={StyleSheet.create(style)} name="checkmark" size={size} color={color} />
  
        case 'delete':
            return <AntDesign style={StyleSheet.create(style)} name="delete" size={size} color={color} />    

        case 'circleDown':
            return <AntDesign style={StyleSheet.create(style)} name="circledowno" size={size} color={color} />    
        
        case 'rightCircle':
            return <AntDesign style={StyleSheet.create(style)} name="rightcircleo" size={size} color={color} />    

        case 'leftArrow':
            return <Entypo style={StyleSheet.create(style)} name="chevron-left" size={size} color={color} />    

        case 'home':
            return <AntDesign style={StyleSheet.create(style)} name="home" size={size} color={color} />    
        
        case 'check':
            return <Feather style={StyleSheet.create(style)} name="check" size={size} color={color} />    

        case 'plus':
            return <AntDesign style={StyleSheet.create(style)} name="plus" size={size} color={color} /> 

        case 'minus':
            return <Entypo style={StyleSheet.create(style)} name="minus" size={size} color={color} />    

        case 'search':
            return <MaterialIcons style={StyleSheet.create(style)} name="search" size={size} color={color} />     
        
        case 'leftUp':
            return <Feather style={StyleSheet.create(style)} name="corner-left-up" size={size} color={color} />
           
            
             
            
        //old icons
        
        case 'shop':
            return <Entypo style={StyleSheet.create(style)} name="shop" size={size} color={color} /> 

        case 'share':
            return <MaterialCommunityIcons style={StyleSheet.create(style)} name="share-variant" size={size} color={color} />
            
       
        case 'cart':
            return <MaterialCommunityIcons style={StyleSheet.create(style)} name="cart-outline" size={size} color={color} />

        case 'cart2':
            return <MaterialCommunityIcons style={StyleSheet.create(style)} name="cart" size={size} color={color} />

        case 'bell':
            return <MaterialCommunityIcons style={StyleSheet.create(style)} name="bell" size={size} color={color} />
                
        case 'profile':
            return <FontAwesome5 style={StyleSheet.create(style)} name="user-circle" size={size} color={color} />
            
        case 'favorite':
            return <MaterialIcons style={StyleSheet.create(style)} name="favorite-outline" size={size} color={color} />
        case 'favorite-fill':
            return <MaterialIcons style={StyleSheet.create(style)} name="favorite" size={size} color={color} />    
            
        
        case 'chat':
            return <MaterialIcons style={StyleSheet.create(style)} name="chat-bubble-outline" size={size} color={color} />
            
        case 'filter':
            return <MaterialIcons style={StyleSheet.create(style)} name="filter-list" size={size} color={color} />
            
        case 'sort':
            return <MaterialIcons style={StyleSheet.create(style)} name="sort" size={size} color={color} />
            
        case 'leftUp':
            return <Feather style={StyleSheet.create(style)} name="corner-left-up" size={size} color={color} />

        case 'bag':
            return <Feather style={StyleSheet.create(style)} name="shopping-bag" size={size} color={color} />
            
        case 'backTime':
            return <Entypo style={StyleSheet.create(style)} name="back-in-time" size={size} color={color} /> 

        case 'plusCircle':
            return <AntDesign style={StyleSheet.create(style)} name="pluscircleo" size={size} color={color} /> 

        
        case 'minusCircle':
            return <AntDesign style={StyleSheet.create(style)} name="minuscircleo" size={size} color={color} /> 

        case 'map':
            return <Ionicons style={StyleSheet.create(style)} name="ios-location-outline" size={size} color={color} /> 

        case 'wallet':
            return <Ionicons style={StyleSheet.create(style)} name="ios-wallet-outline" size={size} color={color} /> 

        case 'cardList':
            return <Ionicons style={StyleSheet.create(style)} name="ios-clipboard-outline" size={size} color={color} />

        case 'handHeart':
            return <FontAwesome5 style={StyleSheet.create(style)} name="hand-holding-heart" size={size} color={color} />
            
        case 'gift':
            return <Ionicons style={StyleSheet.create(style)} name="ios-gift-outline" size={size} color={color} /> 

        case 'pencil':
            return <SimpleLineIcons style={StyleSheet.create(style)} name="pencil" size={size} color={color} /> 

        case 'back':
            return <MaterialIcons style={StyleSheet.create(style)} name="arrow-back" size={size} color={color} />

        case 'search':
            return <MaterialIcons style={StyleSheet.create(style)} name="search" size={size} color={color} />
        
        case 'rate':
            return <MaterialIcons style={StyleSheet.create(style)} name="rate-review" size={size} color={color} />
            
        case 'logout':
            return <Ionicons style={StyleSheet.create(style)} name="log-out-outline" size={size} color={color} /> 

        case 'date':
            return <Fontisto style={StyleSheet.create(style)} name="date" size={size} color={color} /> 
            
        
            // clipboard-notes
        case 'clipboard-notes':
            return <Foundation style={StyleSheet.create(style)} name="clipboard-notes" size={size} color={color} />
        default:
            return <Icon style={StyleSheet.create(style)} name="pencil" size={45} color="#303030" />
    }
}

Icons.defaultProps = {
    style: null,
    color: null
}

export default Icons