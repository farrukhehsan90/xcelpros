import React, { Component } from "react";
import { Table, TableRow, TableCell, TableHead, TableBody, Toolbar } from "@material-ui/core";
import { connect } from "react-redux";
import { getUsers } from "../../actions/userActions";
import Header from "../common/Header";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
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
      const {user,loading}=this.props.users;
    const { users } = this.state;

    let tableContent;

    if (users.length > 0) {
      tableContent = users.map(user => (
        <TableRow>
    <TableCell>{user.firstName}</TableCell>
    <TableCell>{user.lastName}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>{user.phone}</TableCell>
        </TableRow>
      ));
    }

    return (
      <div>
          {loading || users.length===0?<Spinner/>:
          <React.Fragment>

          <Header/>
          
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {tableContent}
          </TableBody>
        </Table>
          </React.Fragment>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { getUsers })(Dashboard);
