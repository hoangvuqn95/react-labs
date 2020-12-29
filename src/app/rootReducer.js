import todoReducer from 'features/Todo/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  todos: todoReducer,
});

export default rootReducer;
