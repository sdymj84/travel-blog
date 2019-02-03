import slugify from 'slugify'

export const createPost = (post, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
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
            // set 'howManyPosts' in country doc in countries db
            const countryRef = db.collection('countries').where('countryName', '==', post.country).limit(1)
            countryRef.get().then(querySnapshot => {
              querySnapshot.forEach(doc => {
                db.collection('countries').doc(doc.id).update({
                  howManyPosts: doc.data().howManyPosts + 1,
                })
              })
            })
            post.id = doc.id
            // redirect to post detail page when db work is done
            history.history.push(`/post/${post.country}/${doc.id}`)
            dispatch({ type: 'ADD_POST', post })
          }).catch((err) => {
            dispatch({ type: 'ADD_POST_ERROR', err })
          })
        })
      })
  }
}

export const createCountry = (country) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const db = getFirestore()

    // slugify country name and add to db
    const countrySlugName = slugify(country.countryName, { lower: true })
    const continentSlugName = slugify(country.continent, { lower: true })

    // add image to firebase storage
    const ref = firebase.storage().ref().child(`countries/${country.selectedFile.name}`)
    ref.put(country.selectedFile)
      .then(() => {
        delete country.selectedFile

        // after adding image, add country to db including image url from storage
        ref.getDownloadURL().then(url => {
          db.collection('countries').add({
            ...country,
            countrySlugName: countrySlugName,
            continentSlugName: continentSlugName,
            howManyPosts: 0,
            photoUrl: url,
          }).then((doc) => {
            dispatch({ type: 'ADD_COUNTRY', country })
          }).catch((err) => {
            dispatch({ type: 'ADD_COUNTRY_ERROR', err })
          })
        })
      })
  }
}

