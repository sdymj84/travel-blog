import authReducer from './authReducer'
import postReducer from './postReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

// firestore reducer is for syncing our firestore data with our state in the background
// so that state has firestore props and Components can access firestore data from state

// firebase reducer is for syncing firebase auth
// so that you can track user status in any page

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer