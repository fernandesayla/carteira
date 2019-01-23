import { GET_CLIENTES } from '../actions/types';
const initialState = { clientes: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTES:
      return { ...state, clientes: action.payload };

    default:
      return state;
  }
}
