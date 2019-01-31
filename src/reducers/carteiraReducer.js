import { GET_CARTEIRAS, GET_CARTEIRA, GET_GECEX } from '../actions/types';
const initialState = { carteiras: [], carteira: {}, gecexs: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CARTEIRAS:
      return { ...state, carteiras: action.payload };
    case GET_CARTEIRA:
      return { ...state, carteira: action.payload };

    case GET_GECEX:
      return { ...state, gecexs: action.payload };

    default:
      return state;
  }
}
