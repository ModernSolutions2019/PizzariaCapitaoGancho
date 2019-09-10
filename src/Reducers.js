import {combineReducers} from 'redux';

import AuthReducer from './reducers/AuthReducers';
import UserReducer from './reducers/UserReducer';

import RankingReducer from './reducers/RankingReducer';

const Reducers = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  rank: RankingReducer,
});

export default Reducers;
