import { takeLatest, call, put, all } from 'redux-saga/effects';
import cogoToast from 'cogo-toast';
import api from '../../../services/api';
import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield call(api.post, 'sessions', email, password);
    const { token, user } = response.data;
    api.defaults.headers.authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
  } catch (err) {
    cogoToast.error('Falha no logon, por favor tente novamente', {
      position: 'top-right',
    });
  }
}
export function* setToken({ payload }) {
  try {
    const { token } = payload.auth;
    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      yield put(signInSuccess(token));
    }
  } catch (err) {
    cogoToast.error('Falha ao carregar as informações de logon', {
      position: 'top-right',
    });
  }
}
export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('persist/REHYDRATE', setToken),
]);
