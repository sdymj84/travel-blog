import slugify from 'slugify'

export const createPost = (post, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const db = getFirestore()

    // slugify country name and add to db
    const countrySlug = slugify(post.country, { lower: true })
    const ref = firebase.storage().ref().child(`posts/${post.selectedFile.name}`)

    const uploadMain = new Promise((resolve, reject) => {
      // add image to firebase storage
      ref.put(post.selectedFile).then(() => {
        delete post.selectedFile
        ref.getDownloadURL().then(url => {
          post.mainImage = url
          resolve("main image upload finish")
        })
      })
    })

    const uploadContent = new Promise((resolve, reject) => {
      const contentsLen = post.contents.length
      post.contents.map((content, i) => {
        ref.put(content.image).then(() => {
          ref.getDownloadURL().then(url => {
            content.image = url
            if (contentsLen === i + 1) {
              resolve("content images upload finish")
            }
          })
        })
      })
    })

    Promise.all([uploadMain, uploadContent]).then((msg) => {
      console.log(msg)
      post.contents = post.contents.map(content => {
        return Object.assign({}, content)
      })
      db.collection('posts').add({
        ...post,
        countrySlug: countrySlug,
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
        history.push(`/post/${post.country}/${doc.id}`)
        dispatch({ type: 'ADD_POST', post })
      }).catch((err) => {
        dispatch({ type: 'ADD_POST_ERROR', err })
      })
    })


    // after adding image, add post to db including image url from storage
    // ref.getDownloadURL().then(url => {



    // })
    // })
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

