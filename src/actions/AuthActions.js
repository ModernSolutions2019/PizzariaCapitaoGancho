import firebase from '../FirebaseConnection';

import RNFetchBlob from 'rn-fetch-blob';

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

export const logar = (email, senha, setErroGeral, callback) => {
  email = email.trim();
  return dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then(() => {
        let uid = firebase.auth().currentUser.uid;

        callback();

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
        callback();
      });
  };
};

export const cadastrar = (objeto, callback) => {
  return dispatch => {
    let cadastro = true;

    if (objeto.props.senha != objeto.props.confirmarSenha) {
      objeto.props.setCorErroSenha('#f00', 4);
      objeto.props.setErroSenha('As senhas não batem.');

      objeto.props.setErroConfirmarSenha('As senhas não batem.');
      objeto.props.setCorErroConfirmarSenha('#f00', 4);
      callback();
      cadastro = false;
    }

    if (objeto.props.nome == '') {
      objeto.props.setErroNome('Campo nome completo obrigatório');
      objeto.props.setCorErroNome('#f00', 4);
      callback();
      cadastro = false;
    }

    nomeCompleto = /^[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+$/;
    nomeCompleto2 = /^[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+$/;
    nomeCompleto3 = /^[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+$/;
    nomeCompleto4 = /^[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+$/;
    nomeCompleto5 = /^[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+$/;
    nomeCompleto6 = /^[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+ +[a-zA-ZÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõ]+$/;

    if (objeto.props.nome) {
      if (
        nomeCompleto.test(objeto.props.nome) ||
        nomeCompleto2.test(objeto.props.nome) ||
        nomeCompleto3.test(objeto.props.nome) ||
        nomeCompleto4.test(objeto.props.nome) ||
        nomeCompleto5.test(objeto.props.nome) ||
        nomeCompleto6.test(objeto.props.nome)
      ) {
        objeto.props.setCorErroNome('#27408B', 4);
        objeto.props.setErroNome(null);
      } else {
        if (nome == '') {
          objeto.props.setCorErroNome('#27408B', 4);
          objeto.props.setErroNome(null);
        } else {
          objeto.props.setCorErroNome('#f00', 4);
          objeto.props.setErroNome('Digite seu nome completo');
          callback();
          cadastro = false;
        }
      }
    }

    if (objeto.props.avatar == null) {
      objeto.props.setErroAvatar('A inserção de um avatar é obrigatório');
      objeto.props.setCorErroAvatar('#f00', 4);
      callback();
      cadastro = false;
    }

    if (objeto.props.email == '') {
      objeto.props.setCorErroEmail('#f00', 4);
      objeto.props.setErroEmail('Campo e-mail obrigatório');
      callback();
      cadastro = false;
    }

    if (objeto.props.senha == '') {
      objeto.props.setCorErroSenha('#f00', 4);
      objeto.props.setErroSenha('Campo senha obrigatório');
      callback();
      cadastro = false;
    }

    if (objeto.props.confirmarSenha == '') {
      objeto.props.setCorErroConfirmarSenha('#f00', 4);
      objeto.props.setErroConfirmarSenha('Campo confirmar senha obrigatório');
      callback();
      cadastro = false;
    }

    if (cadastro === true) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          objeto.props.email.trim(),
          objeto.props.senha,
        )
        .then(() => {
          let uid = firebase.auth().currentUser.uid;

          let uri = objeto.props.avatar.uri.replace('file://', '');

          let mime = 'image/jpeg';

          let avatar = firebase
            .storage()
            .ref()
            .child('clientes')
            .child(`${uid}.jpg`);

          RNFetchBlob.fs
            .readFile(uri, 'base64')
            .then(data => {
              return RNFetchBlob.polyfill.Blob.build(data, {
                type: `${mime};BASE64`,
              });
            })
            .then(blob => {
              avatar.put(blob, {contentType: mime}).on(
                'state_changed',
                snapshot => {
                  // CADASTRO DO NOME NO BANCO DE DADOS
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
                () => {
                  avatar.getDownloadURL().then(url => {
                    firebase
                      .database()
                      .ref('clientes')
                      .child(uid)
                      .set({
                        key: uid,
                        url,
                        nome: objeto.props.nome,
                        pizzas: 0,
                      });

                    callback();

                    dispatch({
                      type: 'editUid',
                      payload: {
                        uid,
                      },
                    });
                  });
                },
              );
            });
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              objeto.props.setCorErroEmail('#f00', 4);
              objeto.props.setErroEmail('E-mail já utilizado');
              break;
            case 'auth/invalid-email':
              objeto.props.setCorErroEmail('#f00', 4);
              objeto.props.setErroEmail('E-mail inválido');
              break;
            case 'auth/operation-not-allowed':
              objeto.props.setCorErroEmail('#f00', 4);
              objeto.props.setErroEmail('Tente novamente mais tarde!');
              break;
            case 'auth/weak-password':
              objeto.props.setCorErroSenha('#f00', 4);
              objeto.props.setErroSenha('A senha deve ter mais que 6 digitos');
              break;
          }
          callback();
        });
    }
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

export const setErroAvatar = erroAvatar => {
  return {
    type: 'setErroAvatar',
    payload: {
      erroAvatar,
    },
  };
};

export const setCorErroAvatar = (corErroAvatar, tamanhoBordaAvatar) => {
  return {
    type: 'setCorErroAvatar',
    payload: {
      corErroAvatar,
      tamanhoBordaAvatar,
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

export const setErroNome = erroNome => {
  return {
    type: 'setErroNome',
    payload: {
      erroNome,
    },
  };
};

export const setCorErroNome = (corErroNome, tamanhoBordaNome) => {
  return {
    type: 'setCorErroNome',
    payload: {
      corErroNome,
      tamanhoBordaNome,
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

export const setCorErroEmail = (corErroEmail, tamanhoBordaEmail) => {
  return {
    type: 'setCorErroEmail',
    payload: {
      corErroEmail,
      tamanhoBordaEmail,
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

export const setCorErroSenha = (corErroSenha, tamanhoBordaSenha) => {
  return {
    type: 'setCorErroSenha',
    payload: {
      corErroSenha,
      tamanhoBordaSenha,
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

export const setErroConfirmarSenha = erroConfirmarSenha => {
  return {
    type: 'setErroConfirmarSenha',
    payload: {
      erroConfirmarSenha,
    },
  };
};

export const setCorErroConfirmarSenha = (
  corErroConfirmarSenha,
  tamanhoBordaConfirmarSenha,
) => {
  return {
    type: 'setCorErroConfirmarSenha',
    payload: {
      corErroConfirmarSenha,
      tamanhoBordaConfirmarSenha,
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
