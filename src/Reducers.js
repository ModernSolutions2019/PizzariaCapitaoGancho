import {combineReducers} from 'redux';

import AuthReducer from './reducers/AuthReducers';
import UserReducer from './reducers/UserReducer';

const Reducers = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
});

export default Reducers;
