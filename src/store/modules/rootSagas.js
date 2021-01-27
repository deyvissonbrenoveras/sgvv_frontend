import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import vehicle from './vehicle/sagas';
import driver from './driver/sagas';
import trip from './trip/sagas';
import user from './user/sagas';

export default function* rootSaga() {
  return yield all([auth, vehicle, driver, trip, user]);
}
