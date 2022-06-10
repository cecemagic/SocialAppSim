import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Image } from 'react-native';
// import APIService from './Networking/API';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Main from '../screens/Main';
import Detail from './screens/Detail';
import Main from './screens/Main';
import User from './screens/User';
import Album from './screens/Album';
import Picture from './screens/Picture';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
// import { FeatherIconsPack } from './feather-icons';
// import Home from '../AxiosExample/assets/Home.svg';
// import Save from './assets/Save';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator 
    initialRouteName={'Main'}

    screenOptions={{
      headerShown: false, 
      tabBarInactiveBackgroundColor:'#b0c9f7', 
      tabBarActiveBackgroundColor:'#b0c9f7',
    }} >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              style={[
                { tintColor: focused ? '#075cf5' : '#00000080' },
              ]}
              source={require('./assets/Home.png')}
            />
          ),
        }}
        name="Main"
        component={Main}
      />


      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              style={[
                { tintColor: focused ? '#075cf5' : '#00000080' },
              ]}
              source={require('./assets/Save.png')}
            />
          ),
        }}
        name="User"
        component={User}
      />
    </Tab.Navigator>
  );
};


export default function App() {
  return (
    <NavigationContainer> 
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#DEE9FD' } }} >
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={TabBar}
          />
          <Stack.Screen
            name="Detail"
            options={{ headerShown: false }}
            component={Detail} />
          <Stack.Screen
            name="Album"
            options={{ headerShown: false }}
            component={Album} />
          <Stack.Screen
            name="Picture"
            options={{ headerShown: false }}
            component={Picture} />
        </Stack.Navigator>
    </NavigationContainer>
    // <View style={{flex:1}}><Detail/></View>
  );
}
