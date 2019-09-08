import {combineReducers} from 'redux';

import AuthReducer from './reducers/AuthReducers';

const Reducers = combineReducers({
  auth: AuthReducer,
});

export default Reducers;
