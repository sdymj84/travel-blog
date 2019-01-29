import authReducer from './authReducer'
import postReducer from './postReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from "redux-firestore";
// these firestore reducers are made for syncing 
// our firestore data with our state in the background

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  firestore: firestoreReducer,
})

export default rootReducer