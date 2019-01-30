import {
  GET_CLIENTES,
  ADD_SELECTED_CLIENTS,
  DELETE_SELECTED_CLIENTS,
  GET_SELECTED_CLIENTS
} from '../actions/types';
const initialState = { clientes: [], selectedClients: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTES:
      return { ...state, clientes: action.payload };

    case ADD_SELECTED_CLIENTS:
      return {
        ...state,
        selectedClients: [action.payload, ...state.selectedClients]
      };

    case DELETE_SELECTED_CLIENTS:
      return {
        ...state,
        selectedClients: state.selectedClients.filter(
          client => client.mci !== action.payload
        )
      };

    case GET_SELECTED_CLIENTS:
      return { ...state };

    default:
      return state;
  }
}
