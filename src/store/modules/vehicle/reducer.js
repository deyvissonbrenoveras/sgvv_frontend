import produce from 'immer';

const INITIAL_STATE = {
  vehicles: [],
  loading: false,
  saving: false,
};

export default function vehicle(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@vehicle/LOAD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@vehicle/LOAD_SUCCESS': {
        draft.loading = false;
        draft.vehicle = action.payload;
        break;
      }
      case '@vehicle/LOAD_ALL_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@vehicle/LOAD_ALL_SUCCESS': {
        draft.vehicles = action.payload;
        draft.loading = false;
        break;
      }
      case '@vehicle/ADD_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@vehicle/UPDATE_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@vehicle/UPDATE_SUCCESS': {
        draft.vehicle = action.payload;
        draft.saving = false;
        break;
      }
      case '@vehicle/REQUEST_SUCCESS': {
        draft.loading = false;
        draft.saving = false;
        break;
      }
      case '@vehicle/REQUEST_FAILURE': {
        draft.loading = false;
        draft.saving = false;
        break;
      }
      default:
    }
  });
}
