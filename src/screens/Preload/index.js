import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

import {NavigationActions, StackActions} from 'react-navigation';

import Logo from '../../Components/Logo/index';

import {verificarLogin} from '../../actions/AuthActions';
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
    if (this.props.status == 2) {
      trocarTela(this, 2, 'Home');
    } else {
      trocarTela(this, 1, 'SecondRoute');
    }
  }

  componentDidUpdate() {
    if (this.props.status == 2) {
      trocarTela(this, 2, 'Home');
    } else {
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
    status: state.auth.status,
  };
};

const PreloadConnection = connect(
  mapStateToProps,
  {verificarLogin},
)(Preload);

export default PreloadConnection;
