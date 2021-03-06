import React, { Component } from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { Container, Card, Row, Col } from 'react-bootstrap'
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Loader from '../layout/Loader'

const StyledContainer = styled.div`
  .container {
    margin-top: 3em;
  }

  .card {
    margin-bottom: 2em;
  }

`

const StyledLink = styled(Link)`
  .card {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: box-shadow, transform;
    transition-property: box-shadow, transform;
  }

  .card:hover, .card:focus, .card:active {
    text-decoration: none;
    -webkit-transform: scale(1.02);
    transform: scale(1.02);
    box-shadow: 1px 1px 20px grey;
  }

`

export class PostList extends Component {

  state = {
    posts: "",
  }

  componentDidUpdate = () => {
    if (!this.state.posts) {
      this.setState({
        posts: this.props.posts
      })
    }
  }

  render() {

    if (this.state.posts) {
      return (
        <StyledContainer>
          <Container>
            <Row>
              {this.state.posts.map(post => {
                return (
                  <Col sm={6} lg={4} key={post.id}>
                    <StyledLink to={`/post/${post.countrySlug}/${post.id}`}>
                      <Card>
                        <Card.Img variant="top" src={post.image} />
                        <Card.Body>
                          <Card.Title>{post.title}</Card.Title>
                          <Card.Text>
                            {post.summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </StyledLink>
                  </Col>
                )
              })}
            </Row>
          </Container>
        </StyledContainer>
      )
    } else {
      return (
        <Loader />
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts
  }
}

export default compose(
  firestoreConnect(props => [{
    collection: 'posts',
    where: ['countrySlug', '==', props.match.params.country]
  }]
  ),
  connect(mapStateToProps),
)(PostList)





