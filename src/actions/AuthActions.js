import firebase from '../FirebaseConnection';

import RNFetchBlob from 'react-native-fetch-blob';

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob;

export const verificarLogin = () => {
  return dispatch => {
    let user = firebase.auth().currentUser;

    if (user) {
      dispatch({
        type: 'mudouStatus',
        payload: {
          status: 1,
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
  };
};

export const logar = (email, senha) => {
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
            alert('Seu usuário está desativado');
            break;
          case 'auth/user-not-found':
            alert('Usuário não foi encontrado');
            break;
          case 'auth/wrong-password':
            alert('E-mail e/ou senha errados!');
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
          .child('Clientes')
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
              snapshot => {},
              error => {
                alert(error.code);
              },
            );
          });

        firebase
          .database()
          .ref('Clientes')
          .child(uid)
          .set({
            key: uid,
            nome,
          });

        dispatch({
          type: 'editUid',
          payload: {
            uid,
          },
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
