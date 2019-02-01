import slugify from 'slugify'

export const createPost = (post, history) => {
  return (dispath, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const db = getFirestore()

    // slugify country name and add to db
    const countrySlug = slugify(post.country, { lower: true })

    // add image to firebase storage
    const ref = firebase.storage().ref().child(`posts/${post.selectedFile.name}`)
    ref.put(post.selectedFile)
      .then(() => {
        delete post.selectedFile

        // after adding image, add post to db including image url from storage
        ref.getDownloadURL().then(url => {
          db.collection('posts').add({
            ...post,
            countrySlug: countrySlug,
            mainImage: url,
            createdAt: new Date()
          }).then((doc) => {
            post.id = doc.id
            // redirect to post detail page when db work is done
            history.push(`/post/${post.country}/${doc.id}`)
            dispath({ type: 'ADD_POST', post })
          }).catch((err) => {
            dispath({ type: 'ADD_POST_ERROR', err })
          })
        })
      })
  }
}
