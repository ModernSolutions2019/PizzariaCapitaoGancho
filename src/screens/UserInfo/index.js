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

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob;

import {
  editAvatar,
  editNome,
  editEmail,
  setErroEmail,
  editSenha,
  setErroSenha,
  editConfirmarSenha,
  cadastrarUsuario,
} from '../../actions/AuthActions';

import {connect} from 'react-redux';

export class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {view, viewTextInformacoesPessoais, textInformacoesPessoais} = styles;
    return (
      <ScrollView style={view}>
        <View style={viewTextInformacoesPessoais}>
          <Text style={textInformacoesPessoais}>Informações Pessoais</Text>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const UserInfoConnection = connect(
  mapStateToProps,
  {},
)(UserInfo);

export default UserInfoConnection;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  input: {
    margin: 10,
    marginBottom: 5,
    padding: 10,
    //borderColor: '#8B6914',
    //borderWidth: 1,
    fontSize: 20,
    color: '#1f33c9',
    backgroundColor: '#ff9e29',
    borderRadius: 20,
  },
  viewBotaoCadastrar: {
    flex: 2,
    justifyContent: 'center',
  },
  estiloBotaoCadastrar: {
    borderColor: '#8B6914',
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    backgroundColor: '#ff9e29',
  },
  txtBtnCadastrar: {
    fontFamily: 'FiraCode-Bold',
    color: '#1f33c9',
    textAlign: 'center',
    fontSize: 20,
  },
  textInformacoesPessoais: {
    color: '#1f33c9',
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewButtonAddFoto: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAddFoto: {
    backgroundColor: '#1f33c9',
    borderRadius: 20,
    borderColor: '#ff9e29',
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAddFoto: {
    color: '#ff9e29',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewAvatar: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
    flex: 3,
  },
  viewPrimeiraFaseCadastro: {
    flex: 1,
    flexDirection: 'column',
  },
  viewCadastro: {
    flex: 4,
    flexDirection: 'column',
  },
  viewSegundaFaseCadastro: {
    flex: 1,
    flexDirection: 'column',
  },
  avatar: {
    marginBottom: 6,
    height: 140,
    width: 140,
    backgroundColor: '#DDD',
  },
  viewTextInformacoesPessoais: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  erro: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 17,
  },
  viewErro: {
    marginTop: 0,
    marginLeft: 30,
  },
});
