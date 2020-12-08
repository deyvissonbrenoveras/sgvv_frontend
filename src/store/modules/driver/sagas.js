import { takeLatest, call, put, all } from 'redux-saga/effects';
import cogoToast from 'cogo-toast';
import api from '../../../services/api';
import {
  loadDriversSuccess,
  requestSuccess,
  loadDriverSuccess,
  updateDriverSuccess,
} from './actions';

export function* loadAllRequest() {
  try {
    const response = yield call(api.get, 'drivers');
    const drivers = response.data;
    yield put(loadDriversSuccess(drivers));
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
    const response = yield call(api.get, `drivers/${_id}`);
    const driver = response.data;
    yield put(loadDriverSuccess(driver));
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
  const driver = payload;
  try {
    yield call(api.post, 'drivers', driver);
    yield put(requestSuccess());
    cogoToast.success(`${driver.name} adicionado com sucesso!`, {
      position: 'top-right',
    });
  } catch (err) {
    const message = err.response
      ? err.response.data.error
      : `Falha ao criar o motorista "${driver.name}", por favor tente novamente`;
    cogoToast.error(message, {
      position: 'top-right',
    });
  }
}
export function* updateRequest({ payload }) {
  const { _id, driver } = payload;
  try {
    const response = yield call(api.put, `drivers/${_id}`, driver);
    yield put(updateDriverSuccess(response.data));
    cogoToast.success(`${driver.name} atualizado com sucesso!`, {
      position: 'top-right',
    });
  } catch (err) {
    const message = err.response
      ? err.response.data.error
      : `Falha ao atualizar o veículo "${driver.name}", por favor tente novamente`;
    cogoToast.error(message, {
      position: 'top-right',
    });
  }
}
export default all([
  takeLatest('@driver/LOAD_ALL_REQUEST', loadAllRequest),
  takeLatest('@driver/ADD_REQUEST', addRequest),
  takeLatest('@driver/LOAD_REQUEST', loadRequest),
  takeLatest('@driver/UPDATE_REQUEST', updateRequest),
]);
