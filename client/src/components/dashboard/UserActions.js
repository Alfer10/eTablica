import React, { Component } from "react";
import { Link } from "react-router-dom";

class userActions extends Component {
  render() {
    return (
      <div className="btn-group mb-4" role="group">
        <Link to="/changepassword" className="btn btn-light">
          <i className="fas fa-key text-info mr-1" />
          Change password
        </Link>
      </div>
    );
  }
}

export default userActions;
