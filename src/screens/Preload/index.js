import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

import {NavigationActions, StackActions} from 'react-navigation';

import Logo from '../../Components/Logo/index';

import {verificarLogin, editUid} from '../../actions/AuthActions';

import {getNome, editPizzas} from '../../actions/UserActions';

import {connect} from 'react-redux';

class Preload extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.props.verificarLogin();
  }

  componentDidMount() {
    trocarTela(this, 2, 'Home');
    if (this.props.uid != '') {
      this.props.getNome();
      trocarTela(this, 1, 'SecondRoute');
    }
  }

  componentDidUpdate() {
    trocarTela(this, 2, 'Home');
    if (this.props.uid != '') {
      this.props.getNome();
      trocarTela(this, 1, 'SecondRoute');
    }
  }

  render() {
    return (
      <View style={styles.view}>
        <StatusBar backgroundColor="#FF4500" barStyle="light-content" />
        <Logo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

const trocarTela = (objeto, numeroStatus, rota) => {
  if (objeto.props.status == numeroStatus) {
    objeto.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: rota})],
      }),
    );
  }
};

const mapStateToProps = state => {
  return {
    pizzas: state.user.pizzas,
    uid: state.auth.uid,
    status: state.auth.status,
  };
};

const PreloadConnection = connect(
  mapStateToProps,
  {editUid, verificarLogin, editPizzas, getNome},
)(Preload);

export default PreloadConnection;
