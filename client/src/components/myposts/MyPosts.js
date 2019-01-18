import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import MyPostItem from "../myposts/MyPostItem";
import { getUserPosts } from "../../actions/postActions";

class MyPosts extends Component {
  componentDidMount() {
    this.props.getUserPosts(this.props.match.params.id);
  }

  render() {
    const { posts, loading } = this.props.post;
    let postItems;

    if (posts === null || loading) {
      postItems = <Spinner />;
    } else {
      if (posts.length > 0) {
        postItems = posts.map(post => (
          <MyPostItem
            key={post._id}
            post={post}
            userId={this.props.match.params.id}
          />
        ));
      } else {
        postItems = <h4>You haven't added any posts yet.</h4>;
      }
    }

    return (
      <div className="posts">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Posts</h1>
              <p className="lead text-center">added by you</p>
              {postItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyPosts.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getUserPosts }
)(MyPosts);
