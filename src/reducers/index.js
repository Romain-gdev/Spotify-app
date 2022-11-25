import { ADD_SONG, DELETE_SONG } from "../actions/types";

export default function songReducer(state = [], action) {
  switch (action.type) {
    case ADD_BOOKMARK:
      return [...state, action.payload];
    case DELETE_BOOKMARK:
      return state.filter((song) => song.id !== action.payload.id);
    default:
      return state;
  }
}
