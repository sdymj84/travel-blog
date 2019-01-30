export const createPost = (post, history) => {
  return (dispath, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const db = getFirestore()

    const ref = firebase.storage().ref().child(`posts/${post.selectedFile.name}`)
    ref.put(post.selectedFile)
      .then(() => {
        delete post.selectedFile

        ref.getDownloadURL().then(url => {
          db.collection('posts').add({
            ...post,
            mainImage: url,
            createdAt: new Date()
          }).then((doc) => {
            post.id = doc.id
            history.push(`/post/${post.country}/${doc.id}`)
            dispath({ type: 'ADD_POST', post })
          }).catch((err) => {
            dispath({ type: 'ADD_POST_ERROR', err })
          })
        })
      })
  }
}
