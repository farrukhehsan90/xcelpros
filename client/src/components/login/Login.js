import React, { Component } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  CardActionArea,
  CardActions,
  Dialog
} from "@material-ui/core";
import { Mail, VpnKey } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {register,login,getUsers} from '../../actions/userActions';

class Login extends Component {
  state = {
    email: "",
    password: "",
    showConfirmPassword: false,
    confirmPassword:'',
    firstName:'',
    lastName:'',
    phone:'',
    showLogin:true,
    user:''
  };

  onChange = e => {

    this.setState({ [e.target.name]: e.target.value,user:'' });
  };

  componentWillReceiveProps(nextProps){
    const {user}=this.state;
    if(nextProps.users.user!==user){
      this.setState({user:nextProps.users.user});
    }

  }

  onLogin=()=>{
    const {firstName,lastName,email,password,phone,showConfirmPassword}=this.state;
    const {history}=this.props;
    const newUser={
      firstName,
      lastName,
      phone,
      email,
      password
    }

    if(showConfirmPassword){
      
     return this.props.register(newUser,history);
    }

    return this.props.login(email,password,history);

  }



  render() {
    // const {user}=this.props.users;
    const {user,showLogin,firstName,lastName,phone,email, password, showConfirmPassword,confirmPassword } = this.state;

    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height:'99vh',
          backgroundColor:'#4B0082',
          justifyContent: "center",
          alignitems: "center"
        }}
      >
        <Dialog fullWidth open={showLogin}>
          <CardHeader
            title={showConfirmPassword ? "Sign Up" : "Log in"}
            style={{ textAlign: "center", margin: "auto" }}
          />
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center",width:'100%',justifyContent:'center',padding:'1% 0' }}>
              <Mail />
              <TextField placeholder="Enter email" name="email" value={email} onChange={this.onChange} />
            </div>
            <div style={{ display: "flex", alignItems: "center",width:'100%',justifyContent:'center',padding:'1% 0' }}>
              <VpnKey />
              <TextField
                type="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={this.onChange}
              />
            </div>
            {showConfirmPassword && 
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>

            <div style={{ display: "flex", alignItems: "center",width:'100%',justifyContent:'center',padding:'1% 0' }}>
              <VpnKey />
              <TextField
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.onChange}
                />
            </div>
            <div style={{ display: "flex", alignItems: "center",width:'100%',justifyContent:'center',padding:'1% 0' }}>
              <VpnKey />
              <TextField
                placeholder="Enter First Name"
                name="firstName"
                value={firstName}
                onChange={this.onChange}
                />
            </div>
            <div style={{ display: "flex", alignItems: "center",width:'100%',justifyContent:'center',padding:'1% 0' }}>
              <VpnKey />
              <TextField
                placeholder="Enter Last Name"
                name="lastName"
                value={lastName}
                onChange={this.onChange}
                />
            </div>
            <div style={{ display: "flex", alignItems: "center" ,width:'100%',justifyContent:'center',padding:'1% 0'}}>
              <VpnKey />
              <TextField
                placeholder="Enter phone number"
                name="phone"
                value={phone}
                onChange={this.onChange}
                />
            </div>
                </div>}
          </CardContent>

          <CardActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button variant="contained" onClick={this.onLogin} style={{ backgroundColor: "orange",color:'#fff' }}>
              {showConfirmPassword?'Confirm':'Login'}
            </Button>
          </CardActions>
          {(typeof user==='string' && user.length>0)? <Typography style={{color:'red',textAlign:'center',margin:'auto'}}>{user}</Typography>:null}
       
          <Typography
            style={{
              padding: "6% 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              margin: "auto"
            }}
          >
            {showConfirmPassword?'Returning user':'New here'}?{" "}
            <Typography
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => this.setState({ showConfirmPassword: !showConfirmPassword })}
            >
              {showConfirmPassword ? "Log me in" : "Sign Up"}
            </Typography>
          </Typography>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps=state=>({
  users:state.users
})

export default connect(mapStateToProps,{login,register,getUsers})(withRouter(Login));
