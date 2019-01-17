import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { deletePost } from "../../actions/postActions";

class MyPostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  render() {
    const { post, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <h5 className="text-center">{post.name}</h5>
            <hr />
            <p className="text-secondary text-center">
              <Moment format="YYYY-MM-DD HH:mm">{post.date}</Moment>
            </p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <span>
              {post.user === auth.user.id ? (
                <Link to={`/posts/edit/${post._id}`} className="btn btn-info">
                  Edit Post
                </Link>
              ) : null}
              {post.user === auth.user.id ? (
                <button
                  onClick={this.onDeleteClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

MyPostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost }
)(MyPostItem);
