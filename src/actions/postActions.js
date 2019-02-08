import slugify from 'slugify'

export const createPost = (post, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const db = getFirestore()

    // slugify country name and add to db
    const countrySlug = slugify(post.country, { lower: true })

    const uploadMain = new Promise((resolve, reject) => {
      const promiseResult = addImage(post.mainImage, firebase)
      console.log(promiseResult)
      if (promiseResult) {
        resolve("Main image upload promise resolved")
      } else {
        reject("Main image upload promise rejected")
      }
    })

    const uploadContent = new Promise((resolve, reject) => {
      const contentsLen = post.contents.length
      post.contents.map((content, i) => {
        const promiseResult = addImage(content.image, firebase)
        if (promiseResult) {
          if (contentsLen === i + 1) {
            resolve("all content image upload promise resolved")
          }
        } else {
          reject(`Content image ${i + 1} upload promise rejected`)
        }
      })
    })

    // execute db insert logic after storage logic is finished
    Promise.all([uploadMain, uploadContent]).then((msg) => {
      console.log('promise msg :', msg)
      db.collection('posts').add({
        ...post,
        countrySlug: countrySlug,
        createdAt: new Date()
      }).then((doc) => {
        /* // set 'howManyPosts' in country doc in countries db
        const countryRef = db.collection('countries').where('countryName', '==', post.country).limit(1)
        countryRef.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            db.collection('countries').doc(doc.id).update({
              howManyPosts: doc.data().howManyPosts + 1,
            })
          })
        }) */
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

    /* 
      1. get db doc by postId
      2. get ref by http url from db
      3. delete images from storage using url
      4. delete doc from db
    */
    const postDoc = db.collection('posts').doc(postId)
    postDoc.get()
      .then(doc => {
        new Promise((resolve, reject) => {
          const mainImage = doc.data().mainImage
          // delete mainImage from storage
          deleteImage(mainImage, firebase)
          doc.data().contents.map((content, i) => {
            const contentImage = content.image
            // delete contentImage from storage
            deleteImage(contentImage, firebase)
            if (i === doc.data().contents.length - 1) {
              resolve()
            }
          })
        }).then(() => {
          postDoc.delete().then(() => {
            dispatch({ type: 'DELETE_POST' })
          }).catch(err => {
            dispatch({ type: 'DELETE_POST_ERROR' })
          })
        })
      }).catch(err => {
        console.log("Error while getting data from db :", err)
      })

    history.push('/')
  }
}

const deleteImage = (imageUrl, firebase) => {
  const ref = firebase.storage().refFromURL(imageUrl)
  ref.delete().then(() => {
    console.log("Deleted from Storage")
  }).catch(err => {
    console.log("Error while deleting image from storage :", err)
  })
}

const addImage = (imageFile, firebase) => {
  const ref = firebase.storage().ref()
    .child(`posts/${imageFile.name}`)
  // add image to firebase storage
  ref.put(imageFile).then(() => {
    ref.getDownloadURL().then(url => {
      // change file prop to url because file object cannot be uploaded to db
      imageFile = url
      console.log("Image uploaded to storage successfully")
      return "success"
    })
  }).catch(err => {
    console.log("Error while adding image to storage", err)
    return false
  })
}

export const editPost = (post, postId, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const db = getFirestore()

    /* 
      1. get db doc by postId
      
      - if thumbnail
      2. upload new image to storage
      3. get existing url and delete image from storage
      4. then, get new url from stroage and update db with other props
      
      - else
      2. update db
    */

    console.log('post', post)
    console.log('post id', postId)
    // 1. get db doc by postId
    const postDoc = db.collection('posts').doc(postId)
    postDoc.get()
      .then(doc => {

        if (post.thumbnail) {
          // 2. upload new image to storage
          const ref = firebase.storage().ref()
            .child(`posts/${post.selectedFile.name}`)
          // add image to firebase storage
          ref.put(post.selectedFile).then(() => {
            delete post.selectedFile
            ref.getDownloadURL().then(url => {
              // change file prop to url because file object cannot be uploaded to db
              post.mainImage = url
              console.log("Main image upload finish")
            })
          }).catch(err => {
            console.log("Error while adding main image to storage")
          })

          // 3. get existing url and delete image from storage
          // 4. then, get new url from stroage and update db with other props

        }
      })

    // 2. update db
    postDoc.update({
      ...post
    })



    /* const postDoc = db.collection('posts').doc(postId)
    postDoc.get()
      .then(doc => {
        new Promise((resolve, reject) => {
          const mainImage = doc.data().mainImage
          // delete mainImage from storage
          deleteImage(mainImage, firebase)
          doc.data().contents.map((content, i) => {
            const contentImage = content.image
            // delete contentImage from storage
            deleteImage(contentImage, firebase)
            if (i === doc.data().contents.length - 1) {
              resolve()
            }
          })
        }).then(() => {
          postDoc.delete().then(() => {
            dispatch({ type: 'DELETE_POST' })
          }).catch(err => {
            dispatch({ type: 'DELETE_POST_ERROR' })
          })
        })
      }).catch(err => {
        console.log("Error while getting data from db :", err)
      })

    history.push('/') */
  }
}