import React, {Component} from 'react';

import {View} from 'react-native';

import {sair} from '../../actions/AuthActions';

import {connect} from 'react-redux';

import {NavigationActions, StackActions} from 'react-navigation';

import {Sair} from '../../actions/AuthActions';

export class SignOut extends Component {
  constructor(props) {
    super(props);

    logout(this);
  }

  render() {
    return <View />;
  }
}

const SignOutConnection = connect(
  null,
  {Sair},
)(SignOut);

const logout = objeto => {
  objeto.props.Sair();
  objeto.props.navigation.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Home'})],
    }),
  );
};

export default SignOutConnection;
