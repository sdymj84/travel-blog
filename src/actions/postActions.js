export const createPost = (post) => {
  return (dispath, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore()
    db.collection('posts').add({
      ...post,
      createdAt: new Date()
    }).then(() => {
      dispath({ type: 'ADD_POST', post })
    }).catch((err) => {
      dispath({ type: 'ADD_POST_ERROR', err })
    })
  }
}
