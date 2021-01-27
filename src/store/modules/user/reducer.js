import produce from 'immer';

const INITIAL_STATE = {
  users: [],
  user: {},
  loading: false,
  saving: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@user/LOAD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@user/LOAD_SUCCESS': {
        draft.loading = false;
        draft.user = action.payload;
        break;
      }
      case '@user/LOAD_ALL_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@user/LOAD_ALL_SUCCESS': {
        draft.users = action.payload;
        draft.loading = false;
        break;
      }
      case '@user/ADD_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@user/UPDATE_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@user/UPDATE_SUCCESS': {
        draft.user = action.payload;
        draft.saving = false;
        break;
      }
      case '@user/REQUEST_SUCCESS': {
        draft.loading = false;
        draft.saving = false;
        break;
      }
      case '@user/REQUEST_FAILURE': {
        draft.loading = false;
        draft.saving = false;
        break;
      }
      default:
    }
  });
}
