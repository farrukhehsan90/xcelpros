import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import logo from '../../assets/logo.png';
import Timer from './Timer';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { SupervisedUserCircleOutlined } from '@material-ui/icons';
import { logout } from '../../actions/userActions';

const Header = ({history}) => {
    return (
        <React.Fragment>
        <AppBar>
            <Toolbar>
                <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <img src={logo} style={{width:'3%'}}/>
                    <div style={{width:'10%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <Timer/>
                    <SupervisedUserCircleOutlined onClick={()=>{logout();return history.push('/login')}} style={{color:'#fff',fontSize:22,cursor:'pointer'}}/>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
        <Toolbar/>
        </React.Fragment>
    );
}

export default connect(null,{logout})(withRouter(Header));