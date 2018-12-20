import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser, deleteAccount } from "../../actions/userActions";
import Spinner from "../common/Spinner";
import UserActions from "./UserActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user, loading } = this.props.user;
    let dashboardContent;

    if (user === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome, {user.name}</p>
          <UserActions />
          <div style={{ marginBottom: "60px" }} />
          <button
            onClick={this.onDeleteClick.bind(this)}
            className="btn btn-danger"
          >
            Delete my account
          </button>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getCurrentUser, deleteAccount }
)(Dashboard);
