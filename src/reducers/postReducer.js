const initialState = {
  countries: [
    {
      id: 1,
      photoUrl: "/img/south-korea.jpg",
      countryName: "South Korea",
      summary: "My Home",
      continent: "asia",
    },
    {
      id: 2,
      photoUrl: "/img/australia.jpg",
      countryName: "Autralia",
      summary: "Been there for 1y 6m",
      continent: "oceania",
    },
    {
      id: 3,
      photoUrl: "/img/usa.jpg",
      countryName: "United States",
      summary: "My second home",
      continent: "north-america",
    },
  ],

  post_id: "",
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      console.log('added post', action.post)
      return {
        ...state,
        post_id: action.post.id
      }
    case 'ADD_POST_ERROR':
      console.log('error while adding post', action.err)
      return state
    case 'ADD_COUNTRY':
      console.log('added country', action.country)
      return state
    case 'ADD_COUNTRY_ERROR':
      console.log('error while adding country', action.err)
      return state
    default:
      return state
  }
}

export default postReducer