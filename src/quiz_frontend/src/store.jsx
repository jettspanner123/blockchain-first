import { combineReducers, configureStore } from '@reduxjs/toolkit';

/** call reducers */
import questionReducer from './redux/question_reducer';
import resultReducer from './redux/result_reducer';

const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultReducer
})

/** create store with reducer */
export default configureStore({ reducer : rootReducer});