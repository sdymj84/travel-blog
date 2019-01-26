const initialState = {
  test: {
    country: "Minjun's world"
  },

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

  posts: [
    {
      id: 100,
      title: "Seoul 3 days trip",
      summary: "Eat Eat and Eat!",
      mainImage: "/img/south-korea.jpg",
      content: [
        {
          image: "/img/australia.jpg",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quo? Consequatur laboriosam, quam fuga consectetur, incidunt dolores fugiat, non labore obcaecati temporibus optio accusantium neque facere tempora maiores commodi alias.",
        },
        {
          image: "/img/usa.jpg",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, perferendis porro soluta reprehenderit doloremque est nesciunt a rerum excepturi in magni sit deleniti alias nulla iusto vel maiores? Voluptatem, repellendus.",
        }
      ]
    }
  ]
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      console.log('added post', action.post)
      return state
    case 'ADD_POST_ERROR':
      console.log('error while adding post', action.err)
      return state
    default:
      return state
  }
}

export default postReducer