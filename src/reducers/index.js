import { combineReducers } from 'redux';
import carteiraReducer from './carteiraReducer';
import userReducer from './userReducer';
import clienteReducer from './clienteReducer';
export default combineReducers({
  carteira: carteiraReducer,
  user: userReducer,
  clientes: clienteReducer
});
