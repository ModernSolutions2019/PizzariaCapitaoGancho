const initialState = {
  erroGeral: null,
  status: 0,

  avatar: null,
  corErroAvatar: '#27408B',
  tamanhoBordaAvatar: 4,

  nome: '',
  erroNome: null,
  corErroNome: '#27408B',
  tamanhoBordaNome: 4,

  email: '',
  erroEmail: null,
  corErroEmail: '#27408B',
  tamanhoBordaEmail: 4,

  senha: '',
  erroSenha: null,
  corErroSenha: '#27408B',
  tamanhoBordaSenha: 4,

  confirmarSenha: '',
  erroConfirmarSenha: null,
  corErroConfirmarSenha: '#27408B',
  tamanhoBordaConfirmarSenha: 4,

  uid: '',
};

const AuthReducer = (state = initialState, action) => {
  if (action.type === 'mudouStatus') {
    return {...state, status: action.payload.status};
  }

  if (action.type === 'editAvatar') {
    return {...state, avatar: action.payload.avatar};
  }

  if (action.type == 'setErroAvatar') {
    return {...state, erroAvatar: action.payload.erroAvatar};
  }

  if (action.type == 'setCorErroAvatar') {
    return {
      ...state,
      corErroAvatar: action.payload.corErroAvatar,
      tamanhoBordaAvatar: action.payload.tamanhoBordaAvatar,
    };
  }

  if (action.type === 'editNome') {
    return {...state, nome: action.payload.nome};
  }

  if (action.type == 'setErroNome') {
    return {...state, erroNome: action.payload.erroNome};
  }

  if (action.type == 'setCorErroNome') {
    return {
      ...state,
      corErroNome: action.payload.corErroNome,
      tamanhoBordaNome: action.payload.tamanhoBordaNome,
    };
  }

  if (action.type === 'editEmail') {
    return {...state, email: action.payload.email};
  }

  if (action.type == 'setErroEmail') {
    return {
      ...state,
      erroEmail: action.payload.erroEmail,
    };
  }

  if (action.type == 'setCorErroEmail') {
    return {
      ...state,
      corErroEmail: action.payload.corErroEmail,
      tamanhoBordaEmail: action.payload.tamanhoBordaEmail,
    };
  }

  if (action.type === 'editSenha') {
    return {...state, senha: action.payload.senha};
  }

  if (action.type == 'setErroSenha') {
    return {...state, erroSenha: action.payload.erroSenha};
  }

  if (action.type == 'setCorErroSenha') {
    return {
      ...state,
      corErroSenha: action.payload.corErroSenha,
      tamanhoBordaSenha: action.payload.tamanhoBordaSenha,
    };
  }

  if (action.type === 'editConfirmarSenha') {
    return {...state, confirmarSenha: action.payload.confirmarSenha};
  }

  if (action.type == 'setErroConfirmarSenha') {
    return {...state, erroConfirmarSenha: action.payload.erroConfirmarSenha};
  }

  if (action.type == 'setCorErroConfirmarSenha') {
    return {
      ...state,
      corErroConfirmarSenha: action.payload.corErroConfirmarSenha,
      tamanhoBordaConfirmarSenha: action.payload.tamanhoBordaConfirmarSenha,
    };
  }

  if (action.type === 'editUid') {
    return {...state, status: 1, uid: action.payload.uid};
  }

  if (action.type == 'setErroGeral') {
    return {...state, erroGeral: action.payload.erroGeral};
  }

  return state;
};

export default AuthReducer;
