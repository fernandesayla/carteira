import { GET_CARTEIRAS } from '../actions/types';
const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CARTEIRAS:
      return { ...state };

    default:
      return state;
  }
}
