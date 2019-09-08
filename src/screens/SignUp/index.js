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
  cadastrar,
} from '../../actions/AuthActions';

import {connect} from 'react-redux';

export class SignUp extends Component {
  static navigationOptions = {
    title: 'Cadastro',
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
      selection: {start: 0, end: 0},
    };
  }

  componentDidUpdate() {
    if (this.props.status == 1) {
      this.props.navigation.navigate('SecondRoute');
    }
  }

  render() {
    const {
      view,
      viewTextInformacoesPessoais,
      textInformacoesPessoais,
      input,
      viewBotaoCadastrar,
      estiloBotaoCadastrar,
      txtBtnCadastrar,
      viewButtonAddFoto,
      buttonAddFoto,
      textAddFoto,
      viewAvatar,
      viewPrimeiraFaseCadastro,
      viewSegundaFaseCadastro,
      avatar,
      viewCadastro,
      erro,
      viewErro,
    } = styles;
    return (
      <ScrollView style={view}>
        <View style={viewTextInformacoesPessoais}>
          <Text style={textInformacoesPessoais}>Informações Pessoais</Text>
        </View>
        <View style={viewPrimeiraFaseCadastro}>
          <View style={viewAvatar}>
            <Image style={avatar} source={this.props.avatar} />
            <View style={viewButtonAddFoto}>
              <TouchableHighlight
                underlayColor={'#fff'}
                onPress={() => addImg(this)}
                style={buttonAddFoto}>
                <Text style={textAddFoto}>ADICIONAR OU ALTERAR FOTO</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={viewCadastro}>
            <TextInput
              placeholder="Digite seu nome"
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholderTextColor={'#1f33c9'}
              underlineColorAndroid="transparent"
              autoCompleteType={'name'}
              style={input}
              onChangeText={nome => this.props.editNome(nome)}
              value={this.props.nome}
            />
            <TextInput
              placeholder="Digite seu e-mail"
              autoCapitalize={'none'}
              autoCorrect={false}
              ref={x => (this.input = x)}
              placeholderTextColor={'#1f33c9'}
              underlineColorAndroid="transparent"
              autoCompleteType={'email'}
              style={[
                input,
                {
                  borderColor: this.state.erroEmail,
                  borderWidth: this.state.bordaEmail,
                },
              ]}
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
              placeholder="Digite uma senha"
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholderTextColor={'#1f33c9'}
              underlineColorAndroid="transparent"
              autoCompleteType={'password'}
              secureTextEntry={true}
              style={[
                input,
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
        </View>
        <View style={viewSegundaFaseCadastro}>
          <TextInput
            placeholder="Digite a mesma senha novamente"
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholderTextColor={'#1f33c9'}
            underlineColorAndroid="transparent"
            autoCompleteType={'password'}
            secureTextEntry={true}
            style={[
              input,
              {
                borderColor: this.state.erroConfirmarSenha,
                borderWidth: this.state.bordaConfirmarSenha,
              },
            ]}
            value={this.props.confirmarSenha}
            onChangeText={confirmarSenha =>
              this.props.editConfirmarSenha(confirmarSenha)
            }
          />
          {this.props.erroSenha == null ? null : (
            <View style={viewErro}>
              <Text style={erro}>{this.props.erroSenha}</Text>
            </View>
          )}
        </View>

        <View style={viewBotaoCadastrar}>
          <TouchableHighlight
            style={estiloBotaoCadastrar}
            underlayColor={'#1f33c9'}
            onPress={() =>
              this.props.cadastrar(
                this,
                this.props.setErroEmail,
                this.props.setErroSenha,
                this.props.avatar,
                this.props.nome,
                this.props.email,
                this.props.senha,
                this.props.confirmarSenha,
                this.props.uid,
              )
            }>
            <Text style={txtBtnCadastrar}>Cadastrar</Text>
          </TouchableHighlight>
        </View>
        {this.props.erroGeral == null ? null : (
          <View style={viewErro}>
            <Text style={erro}>{this.props.erroGeral}</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const validate = (text, type, objeto) => {
  email = /^[a-zA-Z.]+@+[a-zA-Z]+.com+$/;
  emailBR = /^[a-zA-Z.]+@+[a-zA-Z]+.com.br+$/;

  if (type == 'senha') {
    if (text == '' || text.length >= 6) {
      objeto.setState({bordaSenha: 1, erroSenha: '#8B6914'});
      objeto.props.setErroSenha(null);
    } else {
      objeto.setState({bordaSenha: 4, erroSenha: '#f00'});
      objeto.props.setErroSenha('A senha deve ter mais que 6 digitos');
    }
  }

  if (type == 'email') {
    if (email.test(text) || emailBR.test(text)) {
      objeto.setState({bordaEmail: 1, erroEmail: '#8B6914'});
      objeto.props.setErroEmail(null);
    } else {
      if (text == '') {
        objeto.setState({bordaEmail: 1, erroEmail: '#8B6914'});
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
    objeto.setState({borda: 1, erro: '#8B6914'});
    objeto.props.setErroEmail(null);

    objeto.props.editEmail(text);
  }
  if (type == 'senha') {
    objeto.setState({bordaSenha: 1, erroSenha: '#8B6914'});
    objeto.props.setErroSenha(null);

    objeto.props.editSenha(text);
  }
};

const addImg = objeto => {
  const options = {
    title: 'Selecionar foto de perfil',
    cancelButtonTitle: 'Cancelar',
    takePhotoButtonTitle: 'Tirar uma foto...',
    chooseFromLibraryButtonTitle: 'Escolher uma foto de sua biblioteca...',
  };
  ImagePicker.showImagePicker(options, r => {
    if (r.uri) {
      objeto.props.editAvatar({uri: r.uri});
    }
  });
};

const mapStateToProps = state => {
  return {
    status: state.auth.status,
    avatar: state.auth.avatar,
    nome: state.auth.nome,
    email: state.auth.email,
    erroEmail: state.auth.erroEmail,
    senha: state.auth.senha,
    erroSenha: state.auth.erroSenha,
    confirmarSenha: state.auth.confirmarSenha,
  };
};

const SignUpConnection = connect(
  mapStateToProps,
  {
    editNome,
    editAvatar,
    editNome,
    editEmail,
    setErroEmail,
    editSenha,
    setErroSenha,
    editConfirmarSenha,
    cadastrar,
  },
)(SignUp);

export default SignUpConnection;

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
