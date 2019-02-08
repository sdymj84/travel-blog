import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Image, Button } from 'react-bootstrap'
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import ContentCards from "./ContentCards";
import { Link } from "react-router-dom";
import Loader from '../layout/Loader'
import DeletePostModal from './DeletePostModal'
import { deletePost } from "../../actions/postActions";

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

  .title-container {
    display: flex;
    justify-content: space-between;
  }
  .post-edit button {
    margin: 5px;
  }

`


export class PostDetail extends Component {

  state = {
    modalShow: false
  }

  handleDeleteClick = () => {
    this.setState({ modalShow: true })
  }
  modalClose = () => {
    this.setState({ modalShow: false })
  }
  handleDelete = () => {
    this.setState({ modalShow: false })
    this.props.deletePost(this.props.match.params.post_id)
  }

  render() {
    const { post, uid } = this.props
    const postId = this.props.match.params.post_id
    if (!post) {
      return <Loader />
    }

    return (
      <StyledContainer>
        <Container fluid>
          <Image src={post.mainImage} fluid></Image>
        </Container>
        <Container>
          <div className="title-container">
            <h1>{post.title}</h1>
            {uid ?
              <div className="post-edit">
                <Link to={`/edit/${postId}`}>
                  <Button variant="warning"
                    onClick={this.handleEditClick}>EDIT</Button>
                </Link>
                <Button variant="danger"
                  onClick={this.handleDeleteClick}>DELETE</Button>
              </div>
              : null}
          </div>
          <hr />
          <ContentCards contents={post.contents} />
          <DeletePostModal
            show={this.state.modalShow}
            onHide={this.modalClose}
            handleDelete={this.handleDelete} />
        </Container>
      </StyledContainer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.post_id
  const posts = state.firestore.data.posts
  const post = posts ? posts[id] : null
  const uid = state.firebase.auth.uid
  return {
    post, uid
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deletePost: (postId) => dispatch(deletePost(postId, ownProps.history))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(['posts'])
)(PostDetail)
