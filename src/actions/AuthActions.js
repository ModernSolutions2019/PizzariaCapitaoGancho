import firebase from '../FirebaseConnection';

import RNFetchBlob from 'react-native-fetch-blob';

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob;

export const verificarLogin = () => {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: 'editUid',
          payload: {
            uid: user.uid,
          },
        });
      } else {
        dispatch({
          type: 'mudouStatus',
          payload: {
            status: 2,
          },
        });
      }
    });
  };
};

export const logar = (email, senha, setErroGeral) => {
  return dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then(() => {
        let uid = firebase.auth().currentUser.uid;

        dispatch({
          type: 'editUid',
          payload: {
            uid,
          },
        });
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/user-disabled':
            setErroGeral('Seu usuário está desativado');
            break;
          case 'auth/user-not-found':
            setErroGeral('Usuário não foi encontrado');
            break;
          case 'auth/wrong-password':
            setErroGeral('E-mail e/ou senha errados!');
            break;
          case 'auth/invalid-email':
            setErroGeral('Email não encotrado!');
            break;
          default:
            setErroGeral(error.code);
            break;
        }
      });
  };
};

export const cadastrar = (
  objeto,
  erroEmail,
  erroSenha,
  avatarFoto,
  nome,
  email,
  senha,
  confirmarSenha,
  urlAvatar,
) => {
  return dispatch => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, senha)
      .then(() => {
        let uid = firebase.auth().currentUser.uid;

        let uri = avatarFoto.uri.replace('file://', '');

        let avatar = firebase
          .storage()
          .ref()
          .child('clientes')
          .child(`${uid}.jpg`);

        let mime = 'image/jpeg';

        RNFetchBlob.fs
          .readFile(uri, 'base64')
          .then(data => {
            return RNFetchBlob.polyfill.Blob.build(data, {
              type: mime + ';BASE64',
            });
          })
          .then(blob => {
            avatar.put(blob, {contentType: mime}).on(
              'state_changed',
              snapshot => {
                firebase
                  .database()
                  .ref('clientes')
                  .child(uid)
                  .set({
                    key: uid,
                    nome,
                    pizzas: 0,
                  });

                dispatch({
                  type: 'editUid',
                  payload: {
                    uid,
                  },
                });
              },
              error => {
                switch (error.code) {
                  case 'storage/unknown':
                    // Erro desconhecido
                    break;
                  case 'storage/object-not-found':
                    // URL não encontrada
                    break;
                  case 'storage/bucket-not-found':
                    // Bucket não configurado
                    break;
                  case 'storage/project-not-found':
                    // Projeto não configurado no serviço Cloud storage
                    break;
                  case 'storage/quota-exceeded':
                    // Cota excedida
                    break;
                  case 'storage/unauthenticated':
                    // Usuário não autenticado, refaça o cadastro
                    break;
                  case 'storage/unauthorized':
                    // Usuário não autorizado a executar essa ação
                    break;
                  case 'storage/retry-limit-exceeded':
                    // Limite máximo de tempo de operação (upload, download, exclusão etc.) foi excedida, entre em contato com o suporte
                    break;
                  case 'storage/invalid-checksum':
                    // O arquivo no cliente não corresponde à soma de verificação do arquivo recebido pelo servidor. Envie novamente.
                    break;
                  case 'storage/invalid-checksum':
                    // O arquivo no cliente não corresponde à soma de verificação do arquivo recebido pelo servidor. Envie novamente.
                    break;
                  case 'storage/canceled':
                    // Usuário cancelou a operação
                    break;
                  case 'storage/invalid-event-name':
                    // Nome inválido do evento fornecido. Deve ser um de [`running`, `progress`, `pause`]
                    break;

                  case 'storage/invalid-url':
                    // URL fornecido inválido
                    break;

                  case 'storage/invalid-argument':
                    // O argumento transmitido a put() deve ser matriz `File`, `Blob` ou `UInt8`. O argumento transmitido a putString() deve ser string bruta `Base64` ou `Base64URL`.
                    break;

                  case 'storage/no-default-bucket':
                    //Nenhum intervalo foi configurado na propriedade storageBucket da sua configuração.
                    break;

                  case 'storage/cannot-slice-blob':
                    // Em geral, isso ocorre normalmente quando o arquivo local é alterado (excluído, salvo novamente etc.). Tente fazer o upload novamente após verificar que o arquivo não foi alterado.
                    break;

                  case 'storage/server-file-wrong-size':
                    // O arquivo no cliente não corresponde ao tamanho do arquivo recebido pelo servidor. Envie novamente.
                    break;
                }
              },
            );
          });
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            objeto.setState({bordaEmail: 4, erroEmail: '#f00'});
            erroEmail('E-mail já utilizado');
            break;
          case 'auth/invalid-email':
            objeto.setState({bordaEmail: 4, erroEmail: '#f00'});
            erroEmail('E-mail inválido');
            break;
          case 'auth/operation-not-allowed':
            objeto.setState({bordaEmail: 4, erroEmail: '#f00'});
            erroEmail('Tente novamente mais tarde!');
            break;
          case 'auth/weak-password':
            erroSenha('A senha deve ter mais que 6 digitos');
            break;
        }
      });
  };
};

export const editAvatar = avatar => {
  return {
    type: 'editAvatar',
    payload: {
      avatar,
    },
  };
};

export const editNome = nome => {
  return {
    type: 'editNome',
    payload: {
      nome,
    },
  };
};

export const editEmail = email => {
  return {
    type: 'editEmail',
    payload: {
      email,
    },
  };
};

export const setErroEmail = erroEmail => {
  return {
    type: 'setErroEmail',
    payload: {
      erroEmail,
    },
  };
};

export const setErroGeral = erroGeral => {
  return {
    type: 'setErroGeral',
    payload: {
      erroGeral,
    },
  };
};

export const editSenha = senha => {
  return {
    type: 'editSenha',
    payload: {
      senha,
    },
  };
};

export const setErroSenha = erroSenha => {
  return {
    type: 'setErroSenha',
    payload: {
      erroSenha,
    },
  };
};

export const editConfirmarSenha = confirmarSenha => {
  return {
    type: 'editConfirmarSenha',
    payload: {
      confirmarSenha,
    },
  };
};

export const Sair = () => {
  return dispatch => {
    firebase.auth().signOut();

    dispatch({
      type: 'mudouStatus',
      payload: {
        status: 2,
      },
    });
  };
};
