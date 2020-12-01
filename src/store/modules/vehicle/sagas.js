import { takeLatest, call, put, all } from 'redux-saga/effects';
import cogoToast from 'cogo-toast';
import api from '../../../services/api';
import { loadVehiclesSuccess, requestSuccess } from './actions';

export function* loadRequest() {
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
export function* addRequest({ payload }) {
  const vehicle = payload;
  try {
    yield call(api.post, 'vehicles', vehicle);
    yield put(requestSuccess());
    cogoToast.success(`${vehicle.description} adicionado com sucesso!`, {
      position: 'top-right',
    });
  } catch (err) {
    const message = err.response
      ? err.response.data.error
      : `Falha ao criar o veículo "${vehicle.description}", por favor tente novamente`;
    cogoToast.error(message, {
      position: 'top-right',
    });
  }
}
export default all([
  takeLatest('@vehicle/LOAD_REQUEST', loadRequest),
  takeLatest('@vehicle/ADD_REQUEST', addRequest),
]);
