import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import {getNome} from '../../actions/UserActions';

import {connect} from 'react-redux';

export class UserInfo extends Component {
  static navigationOptions = {
    title: 'Ranking',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      view,
      viewTextNome,
      textNome,
      viewConteudo,
      valorNome,
      viewCabecalho,
      viewTextConsumo,
      textConsumo,
      textQntPizzas,
      textPizzas,
      textPosicao,
      viewTextRanking,
      viewTextPizzas,
    } = styles;
    return (
      <View style={view}>
        <FlatList />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    nome: state.user.nome,
  };
};

const UserInfoConnection = connect(
  mapStateToProps,
  {getNome},
)(UserInfo);

export default UserInfoConnection;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  viewCabecalho: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#FF4500',
  },
  viewTextNome: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNome: {
    marginRight: 10,
    color: '#27408B',
    fontSize: 20,
    fontWeight: 'bold',
  },
  valorNome: {
    color: '#FF4500',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewConteudo: {
    flex: 10,
    flexDirection: 'row',
  },
  viewTextConsumo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTextRanking: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textConsumo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF4500',
  },
  viewTextPizzas: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textQntPizzas: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27408B',
    marginRight: 5,
  },
  textPizzas: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    color: '#27408B',
  },
  textPosicao: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    color: '#27408B',
  },
});
