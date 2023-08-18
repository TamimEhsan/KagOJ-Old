import authReducer from './authReducer'
import {combineReducers} from 'redux'
import profileReducer from "./profileReducer";



const allReducers=combineReducers({
    auth:authReducer,
    profile:profileReducer
})

export default allReducers
