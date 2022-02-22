import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { navReducer, userReducer } from './reducers';

const reducers = combineReducers({
  user: userReducer,
  nav: navReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;
