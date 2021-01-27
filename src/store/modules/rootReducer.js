import { combineReducers } from 'redux';

import auth from './auth/reducer';
import vehicle from './vehicle/reducer';
import driver from './driver/reducer';
import trip from './trip/reducer';
import user from './user/reducer';

export default combineReducers({
  auth,
  vehicle,
  driver,
  trip,
  user,
});
