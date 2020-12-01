import { combineReducers } from 'redux';

import auth from './auth/reducer';
import vehicle from './vehicle/reducer';

export default combineReducers({
  auth,
  vehicle,
});
