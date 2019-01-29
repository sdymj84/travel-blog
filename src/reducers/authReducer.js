const initialState = {
  authError: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNIN_SUCCESS':
      console.log('signed in successfully')
      return {
        ...state,
        authError: null
      }
    case 'SIGNIN_ERROR':
      console.log('error while signing in', action.err)
      return {
        ...state,
        authError: action.err.message
      }
    case 'SIGNOUT_SUCCESS':
      console.log('signed out successfully')
      return state
    case 'SIGNOUT_ERROR':
      console.log('error while signing out', action.err)
      return state
    default:
      return state
  }
}

export default authReducer