// React Navigate Drawer with Bottom Tab
// https://aboutreact.com/bottom-tab-view-inside-navigation-drawer/

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './navigation/DrawerNavigation';
import LoginScreen from './components/LoginScreen';
import { MainForgetPassword } from './components/ForgetPassword/MainForgetPassword';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colleaze as Colleaze } from './app.json';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
