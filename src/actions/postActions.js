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
    ref.put(object.image).then(() => {
      ref.getDownloadURL().then(url => {
        // change file prop to url because file object cannot be uploaded to db
        object.image = url
        resolve("Image uploaded to storage successfully")
      })
    }).catch(err => {
      reject("Error while adding image to storage" + err)
    })
  })
}

const editImage = (object, urlToDelete, firebase) => {
  return new Promise((resolve, reject) => {
    if (object.thumbnail) {
      console.log('editImage', object)
      addImage(object, firebase)
      deleteImage(urlToDelete, firebase)
    }
  })
}


export const editPost = (newPost, postId, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const db = getFirestore()

    /* 
      1. get db doc by postId and get all image urls
      
      2. image update (delete and add if changed)
        a. main image update


      - if thumbnail
      2. upload new image to storage
      3. get existing url and delete image from storage
      4. then, get new url from stroage and update db with other props
      
      - else
      2. update db
    */

    // store urls from all images 
    // so that can find files from storage to delete 
    // without connecting database any more
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
          editImage(newPost, imageUrls[0], firebase)
        }
      })




    /* // slugify country name and add to db
    const countrySlug = slugify(post.country, { lower: true })
  
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