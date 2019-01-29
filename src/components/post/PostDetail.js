import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Image, Card, Row, Col } from 'react-bootstrap'
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

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
  post = this.props.post

  output = this.post ?
    <StyledContainer>
      <Container fluid>
        {/* <Image src={this.post.mainImage} fluid></Image> */}
        <Image src="https://place-hold.it/300x300" fluid></Image>
      </Container>
      <Container>
        <h1>{this.post.title}</h1>
        <hr />
        {this.post.content && this.post.content.map(content => {
          return (
            <Card key={content.cid}>
              <Card.Img variant="top" src={content.image} />
              <Card.Body>
                <Card.Text>
                  {content.body}
                </Card.Text>
              </Card.Body>
            </Card>
          )
        })}
      </Container>
    </StyledContainer>
    :
    <StyledContainer>
      <Container>
        <h3>Loading data...</h3>
      </Container>
    </StyledContainer>

  render() {
    return (
      this.output
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state.firestore.data.posts)
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
