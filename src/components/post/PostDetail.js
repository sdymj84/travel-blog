import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Image, Card, Row, Col } from 'react-bootstrap'
import { connect } from "react-redux";

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
  id = this.props.id

  post = this.props.posts.filter(post => post.id === 100)[0]

  render() {
    console.log("current post : ", this.post)
    return (
      <StyledContainer>
        <Container fluid>
          <Image src={this.post.mainImage} fluid></Image>
        </Container>
        <Container>
          <h1>{this.post.title}</h1>
          <hr />
          {this.post.content && this.post.content.map(content => {
            return (
              <Card>
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
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.post.posts,
    id: ownProps.match.params.post_id
  }
}

export default connect(mapStateToProps)(PostDetail)
