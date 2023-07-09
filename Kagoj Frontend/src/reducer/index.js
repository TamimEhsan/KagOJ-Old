import authReducer from './authReducer'
import {combineReducers} from 'redux'
import profileReducer from "./profileReducer";
import {erroredProblemsReducer} from "./contentReducer";
import statReducer from "./statReducer";
import langReducer from "./langReducer";


const allReducers=combineReducers({
    auth:authReducer,
    profile:profileReducer,
    erroredProblems:erroredProblemsReducer,
    stat:statReducer,
    lang:langReducer
})

export default allReducers
