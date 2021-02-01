export function addVehicleRequest(vehicle, successCB) {
  return {
    type: '@vehicle/ADD_REQUEST',
    payload: vehicle,
    successCB,
  };
}

export function loadVehicleRequest(_id) {
  return {
    type: '@vehicle/LOAD_REQUEST',
    payload: { _id },
  };
}
export function loadVehicleSuccess(vehicle) {
  return {
    type: '@vehicle/LOAD_SUCCESS',
    payload: vehicle,
  };
}

export function loadVehiclesRequest() {
  return {
    type: '@vehicle/LOAD_ALL_REQUEST',
  };
}

export function loadVehiclesSuccess(vehicles) {
  return {
    type: '@vehicle/LOAD_ALL_SUCCESS',
    payload: vehicles,
  };
}
export function updateVehicleRequest(_id, vehicle, successCB) {
  return {
    type: '@vehicle/UPDATE_REQUEST',
    payload: { _id, vehicle },
    successCB,
  };
}
export function updateVehicleSuccess(vehicle) {
  return {
    type: '@vehicle/UPDATE_SUCCESS',
    payload: vehicle,
  };
}
export function requestSuccess() {
  return {
    type: '@vehicle/REQUEST_SUCCESS',
  };
}
export function requestFailure() {
  return {
    type: '@vehicle/REQUEST_FAILURE',
  };
}
