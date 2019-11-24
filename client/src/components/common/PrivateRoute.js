import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component,users,...rest }) => {
  
    const {isAuthenticated}=users;
    console.log('component',Component);
    console.log('isAuthenticated',isAuthenticated);
    return <Route
    {...rest}
    render={props => {
      return isAuthenticated  ? <Component {...props} /> : <Redirect to="/login" />;
    }}
  />
};

const mapStateToProps=(state)=>({
    users:state.users
})

export default connect(mapStateToProps,{})(PrivateRoute)
