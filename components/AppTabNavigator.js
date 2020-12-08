import React,{Component} from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator,createAppContainer} from 'react-navigation';
import BookDonateScreen from '../screens/BookDonateScreen';
import BookRequestScreen from '../screens/BookRequestScreen';

export const AppTabNavigator = createBottomTabNavigator({
  DonateBooks: {
   screen: BookDonateScreen,
  navigationOptions: {
      tabBarIcon: <Image source={require('../assets/request-list[2740].png')} style={{width: 20,height: 20}}/>,
      tabBarLabel: "Donate Books"
    }
},
BookRequest: {
   screen: BookRequestScreen,
   navigationOptions: {
       tabBarIcon: <Image source={require('../assets/request-book[2739].png')} style={{width: 20,height: 20}}/>,
       tabBarLabel: "Request Books"
   } 
} 

})

