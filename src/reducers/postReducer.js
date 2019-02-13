const initialState = {
  post_id: "",
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      console.log('added post', action.post)
      return {
        ...state,
        post_id: action.post.id
      }
    case 'ADD_POST_ERROR':
      console.log('Error while adding post', action.err)
      return state

    case 'ADD_COUNTRY':
      console.log('Post is successfully added to database', action.country)
      return state
    case 'ADD_COUNTRY_ERROR':
      console.log('Error while adding country', action.err)
      return state

    case 'EDIT_POST':
      console.log('added post', action.newPost)
      return {
        ...state,
        post_id: action.newPost.id
      }
    case 'EDIT_POST_ERROR':
      console.log('Error while adding post', action.err)
      return state

    case 'DELETE_POST':
      console.log('Database document is deleted')
      return state
    case 'DELETE_POST_ERROR':
      console.log("Error while deleting document from db :", action.err)
      return state

    default:
      return state
  }
}

export default postReducer