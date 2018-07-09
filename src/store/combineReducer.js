import { combineReducers } from 'redux';
import roomReducer from '../reducers/room';
import courseReducer from '../reducers/courses';
import eventReducer from '../reducers/events';
import deadlineReducer from '../reducers/deadline';
import authReducer from '../reducers/auth';
import instructorReducer from '../reducers/instructor';
import conflictReducer from '../reducers/conflict';
 
export default combineReducers({
    room: roomReducer,
    courses: courseReducer,
    event:eventReducer,
    auth:authReducer,
    deadline:deadlineReducer,
    instructor:instructorReducer,
    conflict:conflictReducer
});