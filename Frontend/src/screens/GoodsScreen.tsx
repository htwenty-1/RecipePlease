import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoodsHomeScreen from '../goods/GoodsHomeScreen';
import GoodsPayScreen from '../goods/GoodsPayScreen';

/*
npm install react-native-gesture-handler
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-safe-area-context
npm install react-native-screens
npm install watcher
*/

const Stack = createNativeStackNavigator() //스택 네비게이터 생성후 스택함수 정의

export default function GoodsScreen(){

    return(
      <Stack.Navigator>
        <Stack.Screen name="Home" component={GoodsHomeScreen}></Stack.Screen>

        <Stack.Screen name="Pay" component={GoodsPayScreen}></Stack.Screen>

      </Stack.Navigator>
    )
  }
  //굿즈 컴포넌트 이동
