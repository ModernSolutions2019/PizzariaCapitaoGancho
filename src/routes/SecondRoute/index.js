import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import UserInfo from '../../screens/UserInfo/index';
import Ranking from '../../screens/Ranking/index';

export const SecondRoute = createBottomTabNavigator(
  {
    UserInfo: {
      screen: UserInfo,
    },
    Ranking: {
      screen: Ranking,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: 65,
      },
      headerTitleStyle: {
        color: '#ff9e29',
        fontSize: 20,
      },
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    },
  },
);
