import { GET_USER } from '../actions/types';

const initialState = { user: {} };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state };
    default:
      return state;
  }
}
