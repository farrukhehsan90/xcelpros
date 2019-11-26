import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { updateCount, setCount } from "../../actions/userActions";

const Timer = ({ users, logout, history, updateCount, setCount }) => {
  const { user, count } = users;
  useEffect(() => {
    const currentTime = Math.round(Date.now() / 1000 - 1);
    setCount(user.exp - currentTime);
  }, []);

  useEffect(() => {
    updateCount(logout, history);
  }, [count]);

  return (
    <h1
      style={
        count <= 10
          ? styles.counterRed
          : styles.counterStandard
      }
    >{`00:${count}`}</h1>
  );
};

const styles = {
  counterRed: {
    color: "red",
    padding: 0,
    margin: 0
  },
  counterStandard:{
    color: "#000", padding: 0, margin: 0
  }
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { logout, updateCount, setCount })(
  withRouter(Timer)
);
