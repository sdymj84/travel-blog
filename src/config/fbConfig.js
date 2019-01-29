import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

//----------------------------------------------------
// Initialize Firebase (copy from firebase dashboard)
var config = {
  apiKey: "AIzaSyAQlKm0cCj9XucigFbSgWn78hA_LLQ8Cg4",
  authDomain: "travel-blog-366f7.firebaseapp.com",
  databaseURL: "https://travel-blog-366f7.firebaseio.com",
  projectId: "travel-blog-366f7",
  storageBucket: "travel-blog-366f7.appspot.com",
  messagingSenderId: "358815211681"
};
firebase.initializeApp(config);
//----------------------------------------------------

// firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase