import { GET_CARTEIRAS, GET_CARTEIRA } from '../actions/types';
const initialState = { carteiras: [], carteira: {} };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CARTEIRAS:
      return { ...state, carteiras: action.payload };
    case GET_CARTEIRA:
      return { ...state, carteira: action.payload };
    default:
      return state;
  }
}
