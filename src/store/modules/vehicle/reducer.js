import produce from 'immer';

const INITIAL_STATE = {
  vehicles: [],
  loading: false,
};

export default function vehicle(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@vehicle/LOAD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@vehicle/LOAD_SUCCESS': {
        draft.vehicles = action.payload;
        draft.loading = false;
        break;
      }
      case '@vehicle/ADD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@vehicle/REQUEST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@vehicle/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
