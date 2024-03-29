import { takeLatest, call, put, all } from 'redux-saga/effects';
import cogoToast from 'cogo-toast';
import api from '../../../services/api';
import {
  loadTripsSuccess,
  requestSuccess,
  loadTripSuccess,
  updateTripSuccess,
} from './actions';

export function* loadAllRequest({ payload }) {
  const { startTime, endTime, status } = payload;
  try {
    const response = yield call(api.get, 'trips', {
      params: { startTime, endTime, status },
    });
    const trips = response.data;
    yield put(loadTripsSuccess(trips));
  } catch (err) {
    cogoToast.error('Falha ao carregar as viagens, por favor tente novamente', {
      position: 'top-right',
    });
  }
}
export function* loadRequest({ payload }) {
  const { _id } = payload;
  try {
    const response = yield call(api.get, `trips/${_id}`);
    const trip = response.data;
    yield put(loadTripSuccess(trip));
  } catch (err) {
    cogoToast.error('Falha ao carregar a viagem, por favor tente novamente', {
      position: 'top-right',
    });
  }
}
export function* addRequest({ payload, successCB }) {
  const trip = payload;
  try {
    const response = yield call(api.post, 'trips', trip);
    yield put(requestSuccess());
    cogoToast.success(`viagem iniciada com sucesso!`, {
      position: 'top-right',
    });
    successCB(response.data._id);
  } catch (err) {
    const message = err.response
      ? err.response.data.error
      : `Falha ao iniciar a viagem, por favor tente novamente`;
    cogoToast.error(message, {
      position: 'top-right',
    });
  }
}
export function* updateRequest({ payload, successCB }) {
  const { _id, trip } = payload;
  try {
    const response = yield call(api.put, `trips/${_id}`, trip);
    yield put(updateTripSuccess(response.data));
    cogoToast.success(`viagem encerrada com sucesso!`, {
      position: 'top-right',
    });
    successCB(response.data);
  } catch (err) {
    const message = err.response
      ? err.response.data.error
      : `Falha ao encerrar a viagem, por favor tente novamente`;
    cogoToast.error(message, {
      position: 'top-right',
    });
  }
}
export default all([
  takeLatest('@trip/LOAD_ALL_REQUEST', loadAllRequest),
  takeLatest('@trip/ADD_REQUEST', addRequest),
  takeLatest('@trip/LOAD_REQUEST', loadRequest),
  takeLatest('@trip/UPDATE_REQUEST', updateRequest),
]);
