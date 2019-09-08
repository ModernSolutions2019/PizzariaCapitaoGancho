const initialState = {
  erroGeral: null,
  status: 0,
  avatar: null,
  nome: '',
  email: '',
  erroEmail: null,
  senha: '',
  erroSenha: null,
  confirmarSenha: '',
  uid: '',
};

const AuthReducer = (state = initialState, action) => {
  if (action.type === 'mudouStatus') {
    return {...state, status: action.payload.status};
  }

  if (action.type === 'editAvatar') {
    return {...state, avatar: action.payload.avatar};
  }

  if (action.type === 'editNome') {
    return {...state, nome: action.payload.nome};
  }

  if (action.type === 'editEmail') {
    return {...state, email: action.payload.email};
  }

  if (action.type === 'editSenha') {
    return {...state, senha: action.payload.senha};
  }

  if (action.type === 'editConfirmarSenha') {
    return {...state, confirmarSenha: action.payload.confirmarSenha};
  }

  if (action.type === 'editUid') {
    return {...state, status: 1, uid: action.payload.uid};
  }

  if (action.type == 'setErroEmail') {
    return {...state, erroEmail: action.payload.erroEmail};
  }

  if (action.type == 'setErroSenha') {
    return {...state, erroSenha: action.payload.erroSenha};
  }

  if (action.type == 'setErroGeral') {
    return {...state, erroGeral: action.payload.erroGeral};
  }

  return state;
};

export default AuthReducer;
