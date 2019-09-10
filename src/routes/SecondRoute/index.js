import {createBottomTabNavigator} from 'react-navigation-tabs';

import UserInfo from '../../screens/UserInfo/index';
import Ranking from '../../screens/Ranking/index';
import SignOut from '../../Components/SignOut/index';

import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const SecondRoute = createBottomTabNavigator(
  {
    UserInfo: {
      screen: UserInfo,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" size={30} color={tintColor} />
        ),
      },
    },
    Ranking: {
      screen: Ranking,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="trophy" size={30} color={tintColor} />
        ),
      },
    },
    SignOut: {
      screen: SignOut,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="logout-variant" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    defaultNavigationOptions: {
      tabBarOptions: {
        activeTintColor: '#FF4500',
        inactiveTintColor: '#27408B',
        showIcon: true,

        showLabel: false,

        upperCaseLabel: true,

        style: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderTopColor: '#FF4500',
          borderTopWidth: 4,
        },
        labelStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        tabBarPosition: 'bottom',

        animationEnabled: true,
        swipeEnabled: true,
        unmountInactiveRoutes: true,
      },
    },
  },
);
