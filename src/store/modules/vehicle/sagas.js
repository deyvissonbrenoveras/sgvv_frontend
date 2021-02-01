import { takeLatest, call, put, all } from 'redux-saga/effects';
import cogoToast from 'cogo-toast';
import api from '../../../services/api';
import {
  loadVehiclesSuccess,
  requestSuccess,
  loadVehicleSuccess,
  updateVehicleSuccess,
} from './actions';

export function* loadAllRequest() {
  try {
    const response = yield call(api.get, 'vehicles');
    const vehicles = response.data;
    yield put(loadVehiclesSuccess(vehicles));
  } catch (err) {
    cogoToast.error(
      'Falha ao carregar os veículos, por favor tente novamente',
      {
        position: 'top-right',
      }
    );
  }
}
export function* loadRequest({ payload }) {
  const { _id } = payload;
  try {
    const response = yield call(api.get, `vehicles/${_id}`);
    const vehicle = response.data;
    yield put(loadVehicleSuccess(vehicle));
  } catch (err) {
    cogoToast.error('Falha ao carregar o veículo, por favor tente novamente', {
      position: 'top-right',
    });
  }
}
export function* addRequest({ payload, successCB }) {
  const vehicle = payload;
  try {
    yield call(api.post, 'vehicles', vehicle);
    yield put(requestSuccess());
    cogoToast.success(`${vehicle.description} adicionado com sucesso!`, {
      position: 'top-right',
    });
    successCB();
  } catch (err) {
    const message = err.response
      ? err.response.data.error
      : `Falha ao criar o veículo "${vehicle.description}", por favor tente novamente`;
    cogoToast.error(message, {
      position: 'top-right',
    });
  }
}
export function* updateRequest({ payload, successCB }) {
  const { _id, vehicle } = payload;
  try {
    const response = yield call(api.put, `vehicles/${_id}`, vehicle);
    yield put(updateVehicleSuccess(response.data));
    cogoToast.success(`${vehicle.description} atualizado com sucesso!`, {
      position: 'top-right',
    });
    successCB();
  } catch (err) {
    const message = err.response
      ? err.response.data.error
      : `Falha ao atualizar o veículo "${vehicle.description}", por favor tente novamente`;
    cogoToast.error(message, {
      position: 'top-right',
    });
  }
}
export default all([
  takeLatest('@vehicle/LOAD_ALL_REQUEST', loadAllRequest),
  takeLatest('@vehicle/ADD_REQUEST', addRequest),
  takeLatest('@vehicle/LOAD_REQUEST', loadRequest),
  takeLatest('@vehicle/UPDATE_REQUEST', updateRequest),
]);
