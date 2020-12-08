import produce from 'immer';

const INITIAL_STATE = {
  drivers: [],
  driver: {},
  loading: false,
  saving: false,
};

export default function driver(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@driver/LOAD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@driver/LOAD_SUCCESS': {
        draft.loading = false;
        draft.driver = action.payload;
        break;
      }
      case '@driver/LOAD_ALL_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@driver/LOAD_ALL_SUCCESS': {
        draft.drivers = action.payload;
        draft.loading = false;
        break;
      }
      case '@driver/ADD_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@driver/UPDATE_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@driver/UPDATE_SUCCESS': {
        draft.driver = action.payload;
        draft.saving = false;
        break;
      }
      case '@driver/REQUEST_SUCCESS': {
        draft.loading = false;
        draft.saving = false;
        break;
      }
      case '@driver/REQUEST_FAILURE': {
        draft.loading = false;
        draft.saving = false;
        break;
      }
      default:
    }
  });
}
