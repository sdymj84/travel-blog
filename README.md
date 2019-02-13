# Travel Blog - v0.1
### Blog traveling experiences
---

## Skills
- React, React Router, Redux
- Firebase - Firestore, Auth, Storage
- react-bootstrap, styled-components
---

## App Details
- Travel blog that only I can write/edit/delete. anyone can visit and read
- Filter countries by continent using worldmap on main page
- Contain all logic and style in each single component file using styled-components
- Show welcome page for first time visitors
- Put business logic to write/edit/delete posts in action creators with redux-thunk
---

## Steps to Develop
### 1. Planning the app
- Draw diagram of components and routes
### 2. Create components
- Navbar > Sign In > Sign Up > Create Post
- Home > Post Detail 
### 3. Adding Redux & Reducers & Actions
- First, components get data from redux store using dummy data
- Second, components post data to redux store using Actions / Action Creators
### 4. Use MiddleWare - Thunk
- Use it for async action in action creators such as connecting Firebase
### 5. Setup Firestore
- Create Firestore from website
- Create config
- Connect Redux to Firebase
### 6. Setup Firebase Auth
- Create Firebase Auth from website
- Add to config
- Setup signin/signout and route guard
### 7. Setup Firebase Storage
- Create Firebase Storage from website
- Add to config
- Add files from component > upload file on action creator
- Add download link on firestore