const initialState = {
  nome: '',
  pizzas: 0,
};

const UserReducer = (state = initialState, action) => {
  if (action.type === 'getNome') {
    return {...state, nome: action.payload.nome};
  }

  if (action.type === 'editPizzas') {
    return {...state, pizzas: action.payload.pizzas};
  }

  return state;
};

export default UserReducer;
