import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import UserInfo from '../../screens/UserInfo/index';

export const SecondRoute = createBottomTabNavigator(
  {
    UserInfo: {
      screen: UserInfo,
    },
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerStyle: {
        height: 65,
      },
      headerTitleStyle: {
        color: '#ff9e29',
        fontSize: 20,
      },
    },
  },
);
