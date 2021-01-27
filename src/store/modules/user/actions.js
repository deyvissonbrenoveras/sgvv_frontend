export function addUserRequest(user) {
  return {
    type: '@user/ADD_REQUEST',
    payload: user,
  };
}

export function loadUserRequest(_id) {
  return {
    type: '@user/LOAD_REQUEST',
    payload: { _id },
  };
}
export function loadUserSuccess(user) {
  return {
    type: '@user/LOAD_SUCCESS',
    payload: user,
  };
}

export function loadUsersRequest() {
  return {
    type: '@user/LOAD_ALL_REQUEST',
  };
}

export function loadUsersSuccess(users) {
  return {
    type: '@user/LOAD_ALL_SUCCESS',
    payload: users,
  };
}
export function updateUserRequest(_id, user) {
  return {
    type: '@user/UPDATE_REQUEST',
    payload: { _id, user },
  };
}
export function updateUserSuccess(User) {
  return {
    type: '@user/UPDATE_SUCCESS',
    payload: User,
  };
}
export function requestSuccess() {
  return {
    type: '@user/REQUEST_SUCCESS',
  };
}
export function requestFailure() {
  return {
    type: '@user/REQUEST_FAILURE',
  };
}
