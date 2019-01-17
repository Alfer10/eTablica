import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deletePost, changePostLoc } from "../../actions/postActions";
import Draggable from "react-draggable";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deltaPosition: {
        x: 0,
        y: 0
      }
    };
    this.handleDrag = this.handleDrag.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handleDrag(e, ui) {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
  }

  handleStop() {
    this.props.changePostLoc(this.props.post._id, this.state.deltaPosition);
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  render() {
    const { post, auth } = this.props;

    return (
      <div>
        <Draggable
          bounds="body"
          handle=".handle"
          defaultPosition={{ x: post.x, y: post.y }}
          position={null}
          scale={1}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
        >
          <div
            className="card bg-light mb-3  handle"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">
              <h5 className="text-center">{post.name}</h5>
            </div>
            <div className="card-body">
              <p className="card-text text-center">{post.text}</p>
              <span>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    {" "}
                    Delete post
                  </button>
                ) : null}
              </span>
            </div>
            <div className="card-footer bg-transparent border-info">
              {" "}
              <Moment format="YYYY-MM-DD HH:mm">{post.date}</Moment>
            </div>
          </div>
        </Draggable>
      </div>
    );
  }
}

PostItem.propTypes = {
  changePostLoc: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, changePostLoc }
)(PostItem);
