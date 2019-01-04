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
  }

`

export class PostDetail extends Component {
  id = this.props.id

  // TODO: fix this
  posts = this.props.posts.filter(post => post.id === '100')

  render() {
    console.log(this.posts)
    return (
      <StyledContainer>
        <Container fluid>
          <Image src={this.posts.mainImage} fluid></Image>
        </Container>
        <Container>
          <h1>{this.posts.title}</h1>
          <hr />
          {this.posts.content && this.posts.content.map(content => {
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
