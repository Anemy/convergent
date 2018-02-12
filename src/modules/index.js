import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import convergent from './convergent';

export default combineReducers({
  routing: routerReducer,
  convergent: convergent
});
