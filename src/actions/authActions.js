export const signIn = (credentials) => {
  return (dispath, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispath({ type: 'SIGNIN_SUCCESS' })
    }).catch((err) => {
      dispath({ type: 'SIGNIN_ERROR', err })
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase.auth().signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
      }).catch((err) => {
        dispatch({ type: 'SIGNOUT_ERROR', err })
      })
  }
}
