export function addTripRequest(trip, successCB) {
  return {
    type: '@trip/ADD_REQUEST',
    payload: trip,
    successCB,
  };
}

export function loadTripRequest(_id) {
  return {
    type: '@trip/LOAD_REQUEST',
    payload: { _id },
  };
}
export function loadTripSuccess(trip) {
  return {
    type: '@trip/LOAD_SUCCESS',
    payload: trip,
  };
}

export function loadTripsRequest(startTime, endTime, status) {
  return {
    type: '@trip/LOAD_ALL_REQUEST',
    payload: { startTime, endTime, status },
  };
}

export function loadTripsSuccess(trips) {
  return {
    type: '@trip/LOAD_ALL_SUCCESS',
    payload: trips,
  };
}
export function updateTripRequest(_id, trip, successCB) {
  return {
    type: '@trip/UPDATE_REQUEST',
    payload: { _id, trip },
    successCB,
  };
}
export function updateTripSuccess(trip) {
  return {
    type: '@trip/UPDATE_SUCCESS',
    payload: trip,
  };
}
export function requestSuccess() {
  return {
    type: '@trip/REQUEST_SUCCESS',
  };
}
export function requestFailure() {
  return {
    type: '@trip/REQUEST_FAILURE',
  };
}
