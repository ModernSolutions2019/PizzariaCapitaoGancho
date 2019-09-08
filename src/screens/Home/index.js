import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';

import {connect} from 'react-redux';

import Logo from '../../Components/Logo/index';

import {
  editEmail,
  editSenha,
  logar,
  verificarLogin,
} from '../../actions/AuthActions';

import firebase from '../../FirebaseConnection';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {corTextoInput: '#fff'};
  }

  componentDidUpdate() {
    if (this.props.status == 1) {
      this.props.navigation.navigate('SecondRoute');
    }
  }

  render() {
    const {
      view,
      signInTextInputStyle,
      viewInputs,
      viewLogin,
      viewLoginButton,
      loginButtonStyle,
      textLoginButtonStyle,
      viewCadastro,
      textSignUpButtonStyle,
      buttonSignUpStyle,
    } = styles;

    return (
      <View style={view}>
        <StatusBar backgroundColor="#FF4500" barStyle="light-content" />
        <Logo />
        {/*
                                TELA DE LOGIN
        */}
        <View style={viewLogin}>
          <View style={viewInputs}>
            <TextInput
              style={signInTextInputStyle}
              value={this.props.email}
              onChangeText={texto => this.props.editEmail(texto)}
              placeholderTextColor={this.state.corTextoInput}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              placeholder="Insira seu e-mail"
              selectionColor={this.state.corTextoInput}
              /*INPUT YOUR EMAIL ADDRESS*/
            />

            <TextInput
              style={signInTextInputStyle}
              value={this.props.senha}
              onChangeText={texto => this.props.editSenha(texto)}
              secureTextEntry={true}
              autoCapitalize={'none'}
              autoCorrect={false}
              autoCompleteType={'password'}
              placeholderTextColor={this.state.corTextoInput}
              placeholder="Insira sua senha"
              selectionColor={this.state.corTextoInput}
              //INPUT YOUR PASSWORD
            />
          </View>
          <View style={viewLoginButton}>
            <TouchableOpacity
              style={loginButtonStyle}
              onPress={() =>
                this.props.logar(this.props.email, this.props.senha)
              }>
              <Text style={textLoginButtonStyle}>Entrar</Text>
              {/*SIGN IN*/}
            </TouchableOpacity>
          </View>
        </View>
        {/*
                          BOTÃO PARA IR ATÉ A TELA DE CADASTRO
        */}
        <View style={viewCadastro}>
          <TouchableOpacity
            style={buttonSignUpStyle}
            selectionColor={'#fff'}
            onPress={() => BotaoCadastrar(this.props.navigation)}>
            <Text style={textSignUpButtonStyle}>Cadastrar-se</Text>
            {/*Sign up*/}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const BotaoCadastrar = navigation => {
  navigation.navigate('SignUp');
};

const mapStateToProps = state => {
  return {
    status: state.auth.status,
    email: state.auth.email,
    senha: state.auth.senha,
  };
};

const HomeConnection = connect(
  mapStateToProps,
  {editEmail, editSenha, logar},
)(Home);

export default HomeConnection;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewLogin: {
    flex: 3,
  },
  signInTextInputStyle: {
    borderColor: '#27408B',
    borderWidth: 3,
    backgroundColor: '#00BFFF',
    borderRadius: 20,
    padding: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    margin: 10,
  },
  viewInputs: {
    flex: 3,
    justifyContent: 'center',
  },
  viewLoginButton: {
    flex: 2,
    justifyContent: 'center',
  },
  loginButtonStyle: {
    borderColor: '#27408B',
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    backgroundColor: '#00BFFF',
  },
  textLoginButtonStyle: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  viewCadastro: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderColor: '#FF4500',
    borderTopWidth: 5,
    justifyContent: 'center',
  },
  buttonSignUpStyle: {
    borderColor: '#27408B',
    borderWidth: 2,
    margin: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#00BFFF',
  },
  textSignUpButtonStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
});
