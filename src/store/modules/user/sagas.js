import { takeLatest, call, put, all } from 'redux-saga/effects';
import cogoToast from 'cogo-toast';
import api from '../../../services/api';
import {
  loadUsersSuccess,
  requestSuccess,
  loadUserSuccess,
  updateUserSuccess,
} from './actions';

export function* loadAllRequest() {
  try {
    const response = yield call(api.get, 'users');
    const users = response.data;
    yield put(loadUsersSuccess(users));
  } catch (err) {
    cogoToast.error(
      'Falha ao carregar os motoristas, por favor tente novamente',
      {
        position: 'top-right',
      }
    );
  }
}
export function* loadRequest({ payload }) {
  const { _id } = payload;
  try {
    const response = yield call(api.get, `users/${_id}`);
    const user = response.data;
    yield put(loadUserSuccess(user));
  } catch (err) {
    cogoToast.error(
      'Falha ao carregar o motorista, por favor tente novamente',
      {
        position: 'top-right',
      }
    );
  }
}
export function* addRequest({ payload }) {
  const user = payload;
  try {
    yield call(api.post, 'users', user);
    yield put(requestSuccess());
    cogoToast.success(`${user.name} adicionado com sucesso!`, {
      position: 'top-right',
    });
  } catch (err) {
    const message = err.response
      ? err.response.data.error
      : `Falha ao criar o motorista "${user.name}", por favor tente novamente`;
    cogoToast.error(message, {
      position: 'top-right',
    });
  }
}
export function* updateRequest({ payload }) {
  const { _id, user } = payload;
  try {
    const response = yield call(api.put, `users/${_id}`, user);
    yield put(updateUserSuccess(response.data));
    cogoToast.success(`${user.name} atualizado com sucesso!`, {
      position: 'top-right',
    });
  } catch (err) {
    const message = err.response
      ? err.response.data.error
      : `Falha ao atualizar o veículo "${user.name}", por favor tente novamente`;
    cogoToast.error(message, {
      position: 'top-right',
    });
  }
}
export default all([
  takeLatest('@user/LOAD_ALL_REQUEST', loadAllRequest),
  takeLatest('@user/ADD_REQUEST', addRequest),
  takeLatest('@user/LOAD_REQUEST', loadRequest),
  takeLatest('@user/UPDATE_REQUEST', updateRequest),
]);
