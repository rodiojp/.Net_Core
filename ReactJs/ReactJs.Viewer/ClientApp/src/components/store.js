import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers';

const rootReducer = combineReducers({ counter: reducers.counterReducer })

export const store = createStore(rootReducer);

