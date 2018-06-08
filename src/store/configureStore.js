import {createStore,combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import placesReducer from './reducers/placesReducer'
import authReducer from './reducers/authReducer'
const rootReducer = combineReducers({
    places: placesReducer,
    users: authReducer
});
let composeEnhancers = compose;

if(__DEV__){
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore (rootReducer,composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
