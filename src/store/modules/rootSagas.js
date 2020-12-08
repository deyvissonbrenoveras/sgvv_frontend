import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import vehicle from './vehicle/sagas';
import driver from './driver/sagas';

export default function* rootSaga() {
  return yield all([auth, vehicle, driver]);
}
