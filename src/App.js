import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home'
import WallPaper from './screens/wallpaper';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={() => ({
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })
      } >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WallPaper" component={WallPaper}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

