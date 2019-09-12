import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Keyboard,
  SafeAreaView,
} from 'react-native';

import {connect} from 'react-redux';

import Logo from '../../Components/Logo/index';

import {
  editEmail,
  editSenha,
  logar,
  setErroGeral,
  setErroEmail,
  setErroSenha,
  verificarLogin,
} from '../../actions/AuthActions';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      erroEmail: '#27408B',
      erroSenha: '#27408B',
      erroConfirmarSenha: '#27408B',
      bordaConfirmarSenha: 4,
      bordaEmail: 4,
      bordaSenha: 4,
      corTextoInput: '#fff',
    };
  }

  componentDidUpdate() {
    if (this.props.status == 1) {
      Keyboard.dismiss();
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
      erro,
      viewErro,
    } = styles;

    return (
      <SafeAreaView style={view}>
        <StatusBar backgroundColor="#FF4500" barStyle="light-content" />
        <Logo />
        {/*
                                TELA DE LOGIN
        */}
        <View style={viewLogin}>
          <View style={viewInputs}>
            {/*INPUT YOUR EMAIL ADDRESS*/}
            <TextInput
              style={[
                signInTextInputStyle,
                {
                  borderColor: this.state.erroEmail,
                  borderWidth: this.state.bordaEmail,
                },
              ]}
              placeholderTextColor={this.state.corTextoInput}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              placeholder="Insira seu e-mail"
              selectionColor={this.state.corTextoInput}
              value={this.props.email}
              onBlur={e => validate(this.props.email, 'email', this)}
              onChangeText={email => validateOnChange(email, 'email', this)}
            />
            {this.props.erroEmail == null ? null : (
              <View style={viewErro}>
                <Text style={erro}>{this.props.erroEmail}</Text>
              </View>
            )}
            <TextInput
              //INPUT YOUR PASSWORD
              secureTextEntry={true}
              autoCapitalize={'none'}
              autoCorrect={false}
              autoCompleteType={'password'}
              placeholderTextColor={this.state.corTextoInput}
              placeholder="Insira sua senha"
              selectionColor={this.state.corTextoInput}
              style={[
                signInTextInputStyle,
                {
                  borderColor: this.state.erroSenha,
                  borderWidth: this.state.bordaSenha,
                },
              ]}
              value={this.props.senha}
              onBlur={e => validate(this.props.senha, 'senha', this)}
              onChangeText={senha => validateOnChange(senha, 'senha', this)}
            />
            {this.props.erroSenha == null ? null : (
              <View style={viewErro}>
                <Text style={erro}>{this.props.erroSenha}</Text>
              </View>
            )}
          </View>
          {this.props.erroGeral == null ? null : (
            <View style={viewErro}>
              <Text style={erro}>{this.props.erroGeral}</Text>
            </View>
          )}
          <View style={viewLoginButton}>
            <TouchableOpacity
              style={loginButtonStyle}
              onPress={() =>
                this.props.logar(
                  this.props.email,
                  this.props.senha,
                  this.props.setErroGeral,
                )
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
      </SafeAreaView>
    );
  }
}

const validate = (text, type, objeto) => {
  email = /^[a-zA-Z.]+@+[a-zA-Z]+.com+$/;
  emailBR = /^[a-zA-Z.]+@+[a-zA-Z]+.com.br+$/;

  if (type == 'senha') {
    if (text == '' || text.length >= 6) {
      objeto.setState({bordaSenha: 4, erroSenha: '#27408B'});
      objeto.props.setErroSenha(null);
    } else {
      objeto.setState({bordaSenha: 4, erroSenha: '#f00'});
      objeto.props.setErroSenha('A senha deve ter mais que 6 digitos');
    }
  }

  if (type == 'email') {
    if (email.test(text) || emailBR.test(text)) {
      objeto.setState({bordaEmail: 4, erroEmail: '#27408B'});
      objeto.props.setErroEmail(null);
    } else {
      if (text == '') {
        objeto.setState({bordaEmail: 4, erroEmail: '#27408B'});
        objeto.props.setErroEmail(null);
      } else {
        objeto.setState({bordaEmail: 4, erroEmail: '#f00'});
        objeto.props.setErroEmail('Email inválido');
      }
    }
  }
};

const validateOnChange = (text, type, objeto) => {
  if (type == 'email') {
    objeto.setState({borda: 4, erro: '#27408B'});
    objeto.props.setErroEmail(null);

    objeto.props.editEmail(text);
  }
  if (type == 'senha') {
    objeto.setState({bordaSenha: 4, erroSenha: '#27408B'});
    objeto.props.setErroSenha(null);

    objeto.props.editSenha(text);
  }
};

const BotaoCadastrar = navigation => {
  navigation.navigate('SignUp');
};

const mapStateToProps = state => {
  return {
    status: state.auth.status,
    email: state.auth.email,
    senha: state.auth.senha,
    erroEmail: state.auth.erroEmail,
    erroSenha: state.auth.erroSenha,
    erroGeral: state.auth.erroGeral,
  };
};

const HomeConnection = connect(
  mapStateToProps,
  {
    editEmail,
    editSenha,
    setErroGeral,
    logar,
    setErroEmail,
    verificarLogin,
    setErroSenha,
  },
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
    borderWidth: 4,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    backgroundColor: '#fffafa',
  },
  textLoginButtonStyle: {
    fontWeight: 'bold',
    color: '#FF4500',
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
    borderWidth: 4,
    margin: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#fffafa',
  },
  textSignUpButtonStyle: {
    color: '#FF4500',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  erro: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 17,
  },
  viewErro: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
