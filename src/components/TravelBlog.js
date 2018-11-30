import React, { Component } from 'react'

const container = {
  position: 'relative',
  textAlign: 'center',
  color: 'white',
  fontSize: '7em',
  fontWeight: 'bold'
}

const imgStyle = {
  width: '100%',
  height: '100vh',
  objectFit: 'cover'
}

const centered = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

const buttonStyle = {
  borderRadius: '4px'
}

export class TravelBlog extends Component {
  render() {
    return (
      <div>
        <div className="uk-overflow-hidden" style={container}>
          <img src={'img/welcome.jpg'} alt="welcome image" style={imgStyle}
            uk-scrollspy="cls: uk-animation-kenburns; repeat: true"></img>
          <div style={centered}>
            <p>WELCOME TO TRAVEL BLOG
            <button className="waves-effect uk-button uk-button-primary uk-button-large uk-width-small"
                style={buttonStyle}>ENTER</button>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default TravelBlog
