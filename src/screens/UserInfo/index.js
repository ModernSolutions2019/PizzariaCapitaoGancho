import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import {getNome, editPizzas, adicionarPizza} from '../../actions/UserActions';

import {editUid} from '../../actions/AuthActions';

import {connect} from 'react-redux';
import ModalAddPizzas from '../../Components/ModalAddPizzas/ModalAddPizzas';

export class UserInfo extends Component {
  static navigationOptions = {
    title: 'Informações pessoais',
  };
  constructor(props) {
    super(props);
    this.props.editPizzas(this.props.pizzas);
  }

  render() {
    const {
      view,
      viewModal,
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
      viewAdicionarPizza,
      toAdicionarPizza,
      textAdicionarPizza,
    } = styles;
    return (
      <View style={view}>
        <View style={viewCabecalho}>
          <View style={viewTextNome}>
            <Text style={textNome}>Nome:</Text>
            <Text style={valorNome}>{this.props.nome}</Text>
          </View>
        </View>

        <View style={viewConteudo}>
          <View style={viewTextConsumo}>
            <Text style={textConsumo}>Consumo</Text>
            <View style={viewTextPizzas}>
              <Text style={textQntPizzas}>{this.props.pizzas}</Text>
              <Text style={textPizzas}>Pizzas</Text>
            </View>
          </View>
          <View style={viewTextRanking}>
            <Text style={textConsumo}>Posição</Text>
            <Text style={textPosicao}>1º Lugar</Text>
          </View>
        </View>

        <View style={viewAdicionarPizza}>
          <TouchableHighlight
            underlayColor={'#FF4500'}
            style={toAdicionarPizza}
            onPress={() => {
              this.props.adicionarPizza(this.props.uid, this.props.pizzas);
            }}>
            <Text style={textAdicionarPizza}>+</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    pizzas: state.user.pizzas,
    nome: state.user.nome,
  };
};

const UserInfoConnection = connect(
  mapStateToProps,
  {getNome, editPizzas, editUid, adicionarPizza},
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
  viewAdicionarPizza: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toAdicionarPizza: {
    borderColor: '#27408B',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#fafafa',
  },
  textAdicionarPizza: {
    marginHorizontal: 12,
    marginVertical: 0,
    color: '#27408B',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },
});
