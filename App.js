import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home'
import CreateEmployee from './Screens/CreateEmployee'
import Profile from './Screens/Profile';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
const Stack = createStackNavigator();
 function App() {
   const myoption = {title: "", headerTintColor: "white", headerStyle:{backgroundColor:"#006aff" }}
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{...myoption, title:"My Sweet Home"}} />
        <Stack.Screen name="Create" component={CreateEmployee} options={{...myoption, title:"Create"}} />
        <Stack.Screen name="Profile" component={Profile} options={{...myoption, title:"My profile"}}/>
      </Stack.Navigator>
    </View>
  );
}

export default ()=>{
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
});
