import React, { Component } from "react";
import { Link } from "react-router-dom";

class userActions extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="mx-3 my-auto">
            <Link to="/changepassword" className="btn btn-light">
              <i className="fas fa-key text-info mr-1" />
              Change password
            </Link>
            <Link to={`/posts/user/${user._id}`} className="btn btn-light">
              <i className="fas fa-envelope text-info mr-1" />
              My Posts
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default userActions;
