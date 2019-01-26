export const createPost = (post) => {
  return (dispath, getState) => {
    // set post to database and then/catch below
    dispath({ type: 'ADD_POST', post })
  }
}
