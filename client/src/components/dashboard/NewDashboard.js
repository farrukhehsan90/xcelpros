import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/userActions";
import Spinner from "../common/Spinner";
import UserCards from "../common/UserCards";

class NewDashboard extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.props.getUsers();
  }

  componentWillReceiveProps(nextProps) {
    const { users } = this.state;
    if (nextProps.users.users !== users) {
      this.setState({ users: nextProps.users.users });
    }
  }

  render() {
    const { user, loading, count, avatar } = this.props.users;
    const { users } = this.state;

    let userContent;

    if (users.length > 0) {
      userContent = users.map((allUsers, index) => (
        <UserCards
          userAvatar={index === 0 ? avatar : null}
          userCount={index === 0 ? count : null}
          userPhone={index === 0 ? user.phone : null}
          userEmail={index === 0 ? user.email : null}
          userName={index === 0 ? `${user.firstName} ${user.lastName}` : null}
        />
      ));
    }

    return (
      <React.Fragment>
        {loading || users.length === 0 ? (
          <Spinner />
        ) : (
          <div style={styles.main}>{userContent}</div>
        )}
      </React.Fragment>
    );
  }
}

const styles = {
  main: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%"
  }
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { getUsers })(NewDashboard);
