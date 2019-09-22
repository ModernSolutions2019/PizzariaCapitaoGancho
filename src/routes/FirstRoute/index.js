import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Preload from '../../screens/Preload/index';
import Home from '../../screens/Home/index';
import SignUp from '../../screens/SignUp/index';

import {SecondRoute} from '../SecondRoute/index';

export const FirstRoute = createAppContainer(
  createStackNavigator(
    {
      Preload: {
        screen: Preload,
      },
      Home: {
        screen: Home,
      },
      SignUp: {
        screen: SignUp,
        navigationOptions: {
          title: 'Cadastro',
        },
      },
      SecondRoute: {
        screen: SecondRoute,
        navigationOptions: {
          header: null,
        },
      },
    },
    {
      headerLayoutPreset: 'center',
      defaultNavigationOptions: {
        headerStyle: {
          height: 65,
        },
        headerTitleStyle: {
          color: '#FF4500',
          fontSize: 20,
          fontWeight: 'bold',
        },
      },
    },
  ),
);
