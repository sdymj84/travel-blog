import slugify from 'slugify'

export const createPost = (post, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const db = getFirestore()

    // slugify country name and add to db
    const countrySlug = slugify(post.country, { lower: true })

    // uploadMain holds promise for main image
    const uploadMain = addImage(post, firebase)

    const uploadContent = new Promise((resolve, reject) => {
      const promises = []
      post.contents.map((content, i) => {
        const promise = addImage(content, firebase)
        promises.push(promise)
      })
      Promise.all(promises)
        .then(() => {
          resolve("All content images are uploaded")
        })
        .catch(err => {
          reject("rejected from one of content image upload", err.message)
        })
    })

    // execute db insert logic after storage logic is finished
    Promise.all([uploadMain, uploadContent]).then((msg) => {
      console.log('promise msg :', msg)
      console.log('post', post)
      db.collection('posts').add({
        ...post,
        countrySlug: countrySlug,
        createdAt: new Date()
      }).then((doc) => {
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
          const image = doc.data().image
          // delete image from storage
          deleteImage(image, firebase)
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

const deleteImage = (urlToDelete, firebase) => {
  const ref = firebase.storage().refFromURL(urlToDelete)
  ref.delete().then(() => {
    console.log("Deleted from Storage")
  }).catch(err => {
    console.log("Error while deleting image from storage :", err)
  })
}

// get object that hold image file property
// upload image to storage and change image prop from file to url
const addImage = (object, firebase) => {
  return new Promise((resolve, reject) => {
    const ref = firebase.storage().ref()
      .child(`posts/${object.image.name}`)
    // add image to firebase storage
    console.log('addImage:', object)
    if (object.image) {
      ref.put(object.image).then(() => {
        ref.getDownloadURL().then(url => {
          // change file prop to url because file object cannot be uploaded to db
          object.image = url
          resolve("Image uploaded to storage successfully")
        })
      }).catch(err => {
        reject("Error while adding image to storage" + err)
      })
    } else {
      resolve("image is empty :", object)
    }

  })
}

const editImage = (object, urlArrToDelete, firebase) => {
  return new Promise((resolve, reject) => {
    // if there's thumbnail, it means image is changed
    // if image not changed, do nothing

    // TODO: fix to upload content images properly

    if (object.thumbnail) {
      console.log('editImage', object)
      urlArrToDelete.forEach(urlToDelete => {
        deleteImage(urlToDelete, firebase)
      })

      const promises = []
      object.contents.map((content) => {
        const promise = addImage(content, firebase)
        promises.push(promise)
      })
      Promise.all(promises)
        .then(() => {
          resolve("[editImage] addImage finished")
        })
        .catch(err => {
          reject("[editImage] rejected while adding images", err.message)
        })
    } else {
      resolve()
    }
  })
}


export const editPost = (newPost, postId, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const db = getFirestore()

    // slugify country name and add to db
    const countrySlug = slugify(newPost.country, { lower: true })
    const imageUrls = []
    // 1. get db doc by postId and get all image urls
    const currentDoc = db.collection('posts').doc(postId)
    currentDoc.get()
      .then(doc => {
        const currentPost = doc.data()
        imageUrls.push(currentPost.image)
        currentPost.contents.map(content => {
          imageUrls.push(content.image)
        })
      })
      .then(() => {
        if (newPost.thumbnail) {
          return editImage(newPost, imageUrls, firebase)
        }
      }).then(() => {
        currentDoc.update({
          ...newPost,
          countrySlug,
        }).then(() => {
          console.log("Successfully updated database")
        }).catch(err => {
          console.log('Error while updating database', err.message)
        })
      })


    /* 
  
    // uploadMain holds promise for main image
    const uploadMain = addImage(post, firebase)
  
    const uploadContent = new Promise((resolve, reject) => {
      const contentsLen = post.contents.length
      post.contents.map((content, i) => {
        addImage(content, firebase)
        if (contentsLen === i + 1) {
          resolve("all content images are uploaded")
        }
      })
    })
  
    // execute db insert logic after storage logic is finished
    Promise.all([uploadMain, uploadContent]).then((msg) => {
      console.log('promise msg :', msg)
      console.log('post', post)
      db.collection('posts').add({
        ...post,
        countrySlug: countrySlug,
        createdAt: new Date()
      }).then((doc) => {
        post.id = doc.id
        // redirect to post detail page when db work is done
        history.push(`/post/${post.country}/${doc.id}`)
        dispatch({ type: 'ADD_POST', post })
      }).catch((err) => {
        dispatch({ type: 'ADD_POST_ERROR', err })
      })
    }) */
  }
}