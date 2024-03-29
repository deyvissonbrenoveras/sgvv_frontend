export function addDriverRequest(driver, successCB) {
  return {
    type: '@driver/ADD_REQUEST',
    payload: driver,
    successCB,
  };
}

export function loadDriverRequest(_id) {
  return {
    type: '@driver/LOAD_REQUEST',
    payload: { _id },
  };
}
export function loadDriverSuccess(driver) {
  return {
    type: '@driver/LOAD_SUCCESS',
    payload: driver,
  };
}

export function loadDriversRequest() {
  return {
    type: '@driver/LOAD_ALL_REQUEST',
  };
}

export function loadDriversSuccess(drivers) {
  return {
    type: '@driver/LOAD_ALL_SUCCESS',
    payload: drivers,
  };
}
export function updateDriverRequest(_id, driver, successCB) {
  return {
    type: '@driver/UPDATE_REQUEST',
    payload: { _id, driver },
    successCB,
  };
}
export function updateDriverSuccess(Driver) {
  return {
    type: '@driver/UPDATE_SUCCESS',
    payload: Driver,
  };
}
export function requestSuccess() {
  return {
    type: '@driver/REQUEST_SUCCESS',
  };
}
export function requestFailure() {
  return {
    type: '@driver/REQUEST_FAILURE',
  };
}
