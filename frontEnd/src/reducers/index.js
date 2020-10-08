import {combineReducers} from 'redux';

import notesReducer from './notesReducer'
import { notesCollabReducer } from "./notesCollbReducer";
import { usersReducer } from "./usersReducers";
//import { messageReducer} from './messageReducer'

export default combineReducers({
     notesReducer,
     notesCollabReducer,
     usersReducer,
    // messageReducer
});
