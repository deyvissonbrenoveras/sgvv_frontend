import produce from 'immer';

const INITIAL_STATE = {
  trips: [],
  trip: {},
  loading: false,
  saving: false,
};

export default function driver(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@trip/LOAD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@trip/LOAD_SUCCESS': {
        draft.loading = false;
        draft.trip = action.payload;
        break;
      }
      case '@trip/LOAD_ALL_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@trip/LOAD_ALL_SUCCESS': {
        draft.trips = action.payload;
        draft.loading = false;
        break;
      }
      case '@trip/ADD_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@´trip/UPDATE_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@trip/UPDATE_SUCCESS': {
        draft.trip = action.payload;
        draft.saving = false;
        break;
      }
      case '@trip/REQUEST_SUCCESS': {
        draft.loading = false;
        draft.saving = false;
        break;
      }
      case '@trip/REQUEST_FAILURE': {
        draft.loading = false;
        draft.saving = false;
        break;
      }
      default:
    }
  });
}
