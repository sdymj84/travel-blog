import React from 'react'
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";

const SignOut = () => {
  return (
    <div>

    </div>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignOut)