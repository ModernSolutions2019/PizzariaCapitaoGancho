import React, {Component} from 'react';

import {View, Image, StyleSheet} from 'react-native';

const logo = require('./images/logo.png');

export default class Logo extends Component {
  render() {
    const {view, img} = styles;

    return (
      <View style={view}>
        <Image style={img} resizeMode="contain" source={logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 200,
    height: 200,
  },
});
