import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Picker,
} from 'react-native';

import {Avatar} from 'react-native-elements';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

import LoadingItem from '../../Components/LoadingItem/index';

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob;

import {
  editAvatar,
  editNome,
  setErroNome,
  editEmail,
  setCorErroEmail,
  setErroEmail,
  editSenha,
  setErroSenha,
  editConfirmarSenha,
  setErroConfirmarSenha,
  cadastrar,
  setErroAvatar,
  setCorErroAvatar,
  setCorErroNome,
  setCorErroSenha,
  setCorErroConfirmarSenha,
} from '../../actions/AuthActions';

import {connect} from 'react-redux';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textoSeguro: true,
      loading: false,
    };
  }

  render() {
    const {
      view,

      input,
      viewBotaoCadastrar,
      estiloBotaoCadastrar,
      txtBtnCadastrar,
      viewAvatar,
      viewPrimeiraFaseCadastro,
      viewSegundaFaseCadastro,
      avatar,
      viewCadastro,
      erro,
      viewErro,
      viewErroAvatar,
      erroAvatar,
    } = styles;
    return (
      <ScrollView style={view}>
        <View style={viewPrimeiraFaseCadastro}>
          <View style={viewAvatar}>
            <Avatar
              rounded
              size="xlarge"
              icon={{name: 'user', type: 'font-awesome', color: '#fff'}}
              source={this.props.avatar}
              activeOpacity={0.7}
              containerStyle={[
                avatar,
                {
                  borderWidth: this.props.tamanhoBordaAvatar,
                  borderColor: this.props.corErroAvatar,
                },
              ]}
              showEditButton
              editButton={{
                name: 'mode-edit',
                type: 'material',
                color: '#fff',
                style: {
                  borderRadius: 40,
                  borderWidth: this.props.tamanhoBordaAvatar,
                  borderColor: this.props.corErroAvatar,
                },
                containerStyle: {
                  flex: 1,
                  borderRadius: 40,
                },
                underlayColor: '#fff',
              }}
              onEditPress={() => addImg(this)}
            />
            {this.props.erroAvatar == null ? null : (
              <View style={viewErroAvatar}>
                <Text style={erroAvatar}>{this.props.erroAvatar}</Text>
              </View>
            )}
          </View>
          <View style={viewCadastro}>
            <TextInput
              placeholder="Digite seu nome"
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholderTextColor={'#fff'}
              underlineColorAndroid="transparent"
              autoCompleteType={'name'}
              style={[
                input,
                {
                  borderColor: this.props.corErroNome,
                  borderWidth: this.props.tamanhoBordaNome,
                },
              ]}
              value={this.props.nome}
              onBlur={e => validate(this.props.nome, 'nome', this)}
              onChangeText={nome => validateOnChange(nome, 'nome', this)}
            />
            {this.props.erroNome == null ? null : (
              <View style={viewErro}>
                <Text style={erro}>{this.props.erroNome}</Text>
              </View>
            )}
            <TextInput
              placeholder="Digite seu e-mail"
              autoCapitalize={'none'}
              autoCorrect={false}
              ref={x => (this.input = x)}
              placeholderTextColor={'#fff'}
              underlineColorAndroid="transparent"
              autoCompleteType={'email'}
              style={[
                input,
                {
                  borderColor: this.props.corErroEmail,
                  borderWidth: this.props.tamanhoBordaEmail,
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
              placeholderTextColor={'#fff'}
              underlineColorAndroid="transparent"
              autoCompleteType={'password'}
              secureTextEntry={true}
              style={[
                input,
                {
                  borderColor: this.props.corErroSenha,
                  borderWidth: this.props.tamanhoBordaSenha,
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
            placeholderTextColor={'#fff'}
            underlineColorAndroid="transparent"
            autoCompleteType={'password'}
            secureTextEntry={this.state.textoSeguro}
            style={[
              input,
              {
                borderColor: this.props.corErroConfirmarSenha,
                borderWidth: this.props.tamanhoBordaConfirmarSenha,
              },
            ]}
            value={this.props.confirmarSenha}
            onBlur={e =>
              validate(this.props.confirmarSenha, 'confirmarSenha', this)
            }
            onChangeText={confirmarSenha =>
              validateOnChange(confirmarSenha, 'confirmarSenha', this)
            }
          />
          {this.props.erroConfirmarSenha == null ? null : (
            <View style={viewErro}>
              <Text style={erro}>{this.props.erroConfirmarSenha}</Text>
            </View>
          )}
        </View>
        <View style={viewBotaoCadastrar}>
          <TouchableHighlight
            style={estiloBotaoCadastrar}
            underlayColor={'#1f33c9'}
            onPress={() => {
              this.setState({loading: true});
              this.props.cadastrar(this, () => this.setState({loading: false}));
            }}>
            <Text style={txtBtnCadastrar}>Cadastrar</Text>
          </TouchableHighlight>
        </View>
        {this.props.erroGeral == null ? null : (
          <View style={viewErro}>
            <Text style={erro}>{this.props.erroGeral}</Text>
          </View>
        )}
        <LoadingItem visible={this.state.loading} />
      </ScrollView>
    );
  }
}

const validate = (text, type, objeto) => {
  email = /^[a-z1-9A-Z.]+@+[a-zA-Z]+.com+$/;
  emailBR = /^[a-z1-9A-Z.]+@+[a-zA-Z]+.com.br+$/;

  nomeCompleto = /^[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+$/;
  nomeCompleto2 = /^[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+$/;
  nomeCompleto3 = /^[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+$/;
  nomeCompleto4 = /^[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+$/;
  nomeCompleto5 = /^[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+$/;
  nomeCompleto6 = /^[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+$/;

  if (type == 'nome') {
    if (
      nomeCompleto.test(text) ||
      nomeCompleto2.test(text) ||
      nomeCompleto3.test(text) ||
      nomeCompleto4.test(text) ||
      nomeCompleto5.test(text) ||
      nomeCompleto6.test(text)
    ) {
      objeto.props.setCorErroNome('#27408B', 4);
      objeto.props.setErroNome(null);
    } else {
      if (text == '') {
        objeto.props.setCorErroNome('#27408B', 4);
        objeto.props.setErroNome(null);
      } else {
        objeto.props.setCorErroNome('#f00', 4);
        objeto.props.setErroNome('Digite seu nome completo');
      }
    }
  }

  if (type == 'senha') {
    if (text == '' || text.length >= 6) {
      objeto.props.setCorErroSenha('#27408B', 4);
      objeto.props.setErroSenha(null);
    } else {
      objeto.props.setCorErroSenha('#f00', 4);
      objeto.props.setErroSenha('A senha deve ter mais que 6 digitos');
    }
  }

  if (type == 'confirmarSenha') {
    if (text == '' || text.length == objeto.props.senha.length) {
      objeto.props.setCorErroConfirmarSenha('#27408B', 4);
      objeto.props.setErroConfirmarSenha(null);
    } else {
      objeto.props.setCorErroSenha('#f00', 4);
      objeto.props.setErroSenha('As senhas não batem');
      objeto.props.setCorErroConfirmarSenha('#f00', 4);
      objeto.props.setErroConfirmarSenha('As senhas não batem');
    }
  }

  if (type == 'email') {
    text = text.trim();
    if (email.test(text) || emailBR.test(text)) {
      objeto.props.setCorErroEmail('#27408B', 4);
      objeto.props.setErroEmail(null);
    } else {
      if (text == '') {
        objeto.props.setCorErroEmail('#27408B', 4);
        objeto.props.setErroEmail(null);
      } else {
        objeto.props.setCorErroEmail('#f00', 4);
        objeto.props.setErroEmail('Email inválido');
      }
    }
  }
};

const validateOnChange = (text, type, objeto) => {
  if (type == 'email') {
    objeto.props.setCorErroEmail('#27408B', 4);
    objeto.props.setErroEmail(null);

    objeto.props.editEmail(text);
  }
  if (type == 'senha') {
    if (text.charAt(0) == ' ') {
      text = text.trim();
    }
    objeto.props.setCorErroSenha('#27408B', 4);
    objeto.props.setErroSenha(null);

    objeto.props.editSenha(text);
  }

  if (type == 'confirmarSenha') {
    if (text.charAt(0) == ' ') {
      text = text.trim();
    }
    objeto.props.setCorErroSenha('#27408B', 4);
    objeto.props.setErroSenha(null);

    objeto.props.setCorErroConfirmarSenha('#27408B', 4);
    objeto.props.setErroConfirmarSenha(null);

    objeto.props.editConfirmarSenha(text);
  }

  if (type == 'nome') {
    if (text.charAt(0) == ' ') {
      text = text.trim();
    }
    objeto.props.setCorErroNome('#27408B', 4);

    objeto.props.setErroNome(null);

    objeto.props.editNome(text);
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
      objeto.props.setCorErroAvatar('#27408B', 4);
      objeto.props.setErroAvatar(null);
    }
  });
};

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    avatar: state.auth.avatar,
    erroAvatar: state.auth.erroAvatar,
    corErroAvatar: state.auth.corErroAvatar,
    tamanhoBordaAvatar: state.auth.tamanhoBordaAvatar,
    nome: state.auth.nome,
    erroNome: state.auth.erroNome,
    corErroNome: state.auth.corErroNome,
    tamanhoBordaNome: state.auth.tamanhoBordaNome,
    email: state.auth.email,
    corErroEmail: state.auth.corErroEmail,
    tamanhoBordaEmail: state.auth.tamanhoBordaEmail,
    erroEmail: state.auth.erroEmail,
    senha: state.auth.senha,
    corErroSenha: state.auth.corErroSenha,
    tamanhoBordaSenha: state.auth.tamanhoBordaSenha,
    erroSenha: state.auth.erroSenha,
    confirmarSenha: state.auth.confirmarSenha,
    corErroConfirmarSenha: state.auth.corErroConfirmarSenha,
    tamanhoBordaConfirmarSenha: state.auth.tamanhoBordaConfirmarSenha,
    erroConfirmarSenha: state.auth.erroConfirmarSenha,
  };
};

const ConexaoSignUp = connect(
  mapStateToProps,
  {
    editAvatar,
    editNome,
    setErroNome,
    editEmail,
    setErroEmail,
    editSenha,
    setErroSenha,
    editConfirmarSenha,
    setErroConfirmarSenha,
    setErroAvatar,
    cadastrar,
    setCorErroAvatar,
    setCorErroEmail,
    setCorErroNome,
    setCorErroSenha,
    setCorErroConfirmarSenha,
  },
)(SignUp);

export default ConexaoSignUp;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  input: {
    margin: 10,
    marginBottom: 5,
    padding: 10,
    fontSize: 20,
    color: '#fff',
    backgroundColor: '#00BFFF',
    borderRadius: 20,
  },
  viewBotaoCadastrar: {
    flex: 2,
    justifyContent: 'center',
  },
  estiloBotaoCadastrar: {
    borderColor: '#27408B',
    borderWidth: 4,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    backgroundColor: '#fafafa',
  },
  txtBtnCadastrar: {
    color: '#FF4500',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
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
    flex: 2,
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
  viewComponenteListaProfissoes: {
    flex: 1,
  },
  viewPickerListaProfissoes: {
    justifyContent: 'center',
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#ff9e29',
  },
  pickerListaProfissoes: {
    color: '#1f33c9',
  },
  itemPickerListaProfissoes: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewErroAvatar: {marginTop: 0, marginLeft: 0},
  erroAvatar: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 17,
  },
  viewSenhaTextInput: {
    flexDirection: 'row',
  },
});
