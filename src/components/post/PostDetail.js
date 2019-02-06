import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Image, Card, Row, Col } from 'react-bootstrap'
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import ContentCards from "./ContentCards";

const StyledContainer = styled.div`
  .container {
    margin-top: 3em;
  }

  .container-fluid {
    padding: 0;

    img {
      width: 100%;
      height: 40vh;
      object-fit: cover;
    }
  }

  .card {
    margin-bottom: 1em;
    font-size: 1.2em;
  }

`


export class PostDetail extends Component {

  render() {
    const { post } = this.props

    const output = post ?
      <StyledContainer>
        <Container fluid>
          <Image src={post.mainImage} fluid></Image>
        </Container>
        <Container>
          <h1>{post.title}</h1>
          <hr />
          <ContentCards contents={post.contents} />
        </Container>
      </StyledContainer>
      :
      <StyledContainer>
        <Container>
          <h3>Loading data...</h3>
        </Container>
      </StyledContainer>

    return (
      output
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.post_id
  const posts = state.firestore.data.posts
  const post = posts ? posts[id] : null
  return {
    post: post
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(['posts'])
)(PostDetail)
