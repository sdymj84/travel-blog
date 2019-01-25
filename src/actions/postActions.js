export const createPost = (post) => {
  return (dispath, getState) => {
    // do some async job
    dispath({ type: 'ADD_POST', post })
  }
}
