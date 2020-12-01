export function addVehicleRequest(vehicle) {
  return {
    type: '@vehicle/ADD_REQUEST',
    payload: vehicle,
  };
}
export function loadVehiclesRequest() {
  return {
    type: '@vehicle/LOAD_REQUEST',
  };
}

export function loadVehiclesSuccess(vehicles) {
  return {
    type: '@vehicle/LOAD_SUCCESS',
    payload: vehicles,
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
