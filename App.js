// React Navigate Drawer with Bottom Tab
// https://aboutreact.com/bottom-tab-view-inside-navigation-drawer/

import 'react-native-gesture-handler';
import { AppRegistry,View,Text } from 'react-native';

import React, { useState,useEffect } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './navigation/DrawerNavigation';
import LoginScreen from './components/LoginScreen';
import { MainForgetPassword } from './components/ForgetPassword/MainForgetPassword';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colleaze as Colleaze } from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    setIsLoggedIn(data);
  }

  useEffect(() => {
    getData();
  }, [isLoggedIn]);
  return (
    <NavigationContainer>
      {/* {
        isLoggedIn?(
          <Stack.Navigator initialRouteName='MyDrawer'>
            <Stack.Screen name="MyDrawer" component={MyDrawer} options={{headerShown:false}}/>
        </Stack.Navigator>
        ):(
          <Stack.Navigator initialRouteName='LoginScreen'>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name="MyDrawer" component={MyDrawer} options={{headerShown:false}}/>
            <Stack.Screen name="MainForgetPassword" component={MainForgetPassword} options={{headerShown:false}}/>                       
        </Stack.Navigator>
        )
      } */}
      
      <Stack.Navigator initialRouteName='LoginScreen'>
        
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name="MyDrawer" component={MyDrawer} options={{headerShown:false}}/>
            <Stack.Screen name="MainForgetPassword" component={MainForgetPassword} options={{headerShown:false}}/>                       
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
AppRegistry.registerComponent(Colleaze, () => App);
