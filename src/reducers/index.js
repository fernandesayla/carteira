import { combineReducers } from 'redux';
import carteiraReducer from './carteiraReducer';
import userReducer from './userReducer';

export default combineReducers({
  carteira: carteiraReducer,
  user: userReducer
});
