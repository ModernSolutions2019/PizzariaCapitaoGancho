import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';

import {Icon} from 'react-native-elements';

import {
  getNome,
  editPizzas,
  adicionarPizza,
  removerPizza,
} from '../../actions/UserActions';

import {editUid} from '../../actions/AuthActions';

import {connect} from 'react-redux';
import ModalAddPizzas from '../../Components/ModalAddPizzas/ModalAddPizzas';

export class UserInfo extends Component {
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
      viewRemoverPizza,
      viewBotoesPizza,
    } = styles;
    return (
      <View style={view}>
        <StatusBar backgroundColor="#FF4500" barStyle="light-content" />
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
            <Text style={textPosicao}>{this.props.posicaoRanking}</Text>
          </View>
        </View>
        <View style={viewBotoesPizza}>
          <View style={viewAdicionarPizza}>
            <Icon
              name="add-circle-outline"
              size={45}
              raised={true}
              iconStyle={{alignItems: 'center'}}
              color={'#27408B'}
              underlayColor={'#FF4500'}
              onPress={() =>
                this.props.adicionarPizza(this.props.uid, this.props.pizzas)
              }
            />
          </View>

          <View style={viewRemoverPizza}>
            <Icon
              name="minus"
              type="material-community"
              size={45}
              raised={true}
              iconStyle={{
                color: '#27408B',
              }}
              underlayColor={'#FF4500'}
              onPress={() =>
                this.props.removerPizza(this.props.uid, this.props.pizzas)
              }
            />
          </View>
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
  {getNome, editPizzas, editUid, adicionarPizza, removerPizza},
)(UserInfo);

export default UserInfoConnection;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fffafa',
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
  viewBotoesPizza: {
    flex: 1,
    flexDirection: 'row',
  },
  viewRemoverPizza: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
