import slugify from 'slugify'

export const createPost = (post, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const db = getFirestore()

    // slugify country name and add to db
    const countrySlug = slugify(post.country, { lower: true })

    const uploadMain = new Promise((resolve, reject) => {
      // set ref for main image
      const ref = firebase.storage().ref()
        .child(`posts/${post.selectedFile.name}`)
      // add image to firebase storage
      ref.put(post.selectedFile).then(() => {
        delete post.selectedFile
        ref.getDownloadURL().then(url => {
          // change file prop to url because file object cannot be uploaded to db
          post.mainImage = url
          resolve("main image upload finish")
        })
      }).catch(err => {
        const msg = "Error while adding main image to storage :" + err
        reject(msg)
      })
    })

    const uploadContent = new Promise((resolve, reject) => {
      const contentsLen = post.contents.length
      post.contents.map((content, i) => {
        const ref = firebase.storage().ref()
          .child(`posts/${content.image.name}`)
        ref.put(content.image).then(() => {
          ref.getDownloadURL().then(url => {
            content.image = url
            console.log(content.image)
            console.log('i :', i)
            if (contentsLen === i + 1) {
              console.log('now resolve, i: ', i)
              resolve("content images upload finish")
            }
          })
        }).catch(err => {
          const msg = "Error while adding content images to storage :" + err
          reject(msg)
        })
      })
    })

    // execute db insert logic after storage logic is finished
    Promise.all([uploadMain, uploadContent]).then((msg) => {
      console.log(msg)
      console.log('posts :', post)
      console.log('db :', db)
      db.collection('posts').add({
        ...post,
        countrySlug: countrySlug,
        createdAt: new Date()
      }).then((doc) => {
        console.log("got in db then")
        // set 'howManyPosts' in country doc in countries db
        const countryRef = db.collection('countries').where('countryName', '==', post.country).limit(1)
        countryRef.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            db.collection('countries').doc(doc.id).update({
              howManyPosts: doc.data().howManyPosts + 1,
            })
          })
        })
        console.log("db added")
        post.id = doc.id
        // redirect to post detail page when db work is done
        history.push(`/post/${post.country}/${doc.id}`)
        dispatch({ type: 'ADD_POST', post })
      }).catch((err) => {
        dispatch({ type: 'ADD_POST_ERROR', err })
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


export const deletePost = (postId, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const db = getFirestore()

    console.log(postId, history)
    console.log('deleted')
    history.push('/')
  }
}