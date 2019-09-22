import React, {Component} from 'react';
import {View, StyleSheet, Modal, ActivityIndicator} from 'react-native';

export default class LoadingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // states do projeto
    };

    // Códigos firebase
  }

  render() {
    const {loading} = styles;
    return (
      <Modal animationType="none" transparent visible={this.props.visible}>
        <View style={loading}>
          <ActivityIndicator size="large" color="#1f33c9" />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    opacity: 0.5,
  },
});
