import { combineReducers } from 'redux';

import auth from './auth/reducer';
import vehicle from './vehicle/reducer';
import driver from './driver/reducer';

export default combineReducers({
  auth,
  vehicle,
  driver,
});
