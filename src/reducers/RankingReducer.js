const initialState = {
  clientes: [],
};

const RankingReducer = (state = initialState, action) => {
  /*if (action.type === 'mudouStatus') {
    return {...state, status: action.payload.status};
  }*/
  if (action.type === 'setRankingList') {
    return {...state, clientes: action.payload.clientes};
  }
  return state;
};

export default RankingReducer;
