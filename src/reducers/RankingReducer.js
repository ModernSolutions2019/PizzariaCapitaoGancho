const initialState = {
  clientes: [],
  position: '',
};

const RankingReducer = (state = initialState, action) => {
  /*if (action.type === 'mudouStatus') {
    return {...state, status: action.payload.status};
  }*/
  if (action.type === 'setRankingList') {
    return {...state, clientes: action.payload.clientes};
  }

  if (action.type === 'setPosition') {
    return {...state, position: action.payload.position};
  }

  return state;
};

export default RankingReducer;
