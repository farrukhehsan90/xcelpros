import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {logout} from '../../actions/userActions';

const Timer = ({users,logout,history}) => {
    const {user}=users;
    const [count,setCount]=useState(60);
    useEffect(()=>{
        const currentTime=Math.round(Date.now()/1000-1);
        console.log('initial currentTime',currentTime);
        setCount(user.exp-currentTime);
    },[]);

    useEffect(()=>{
      
        const currentTime=Math.round(Date.now()/1000);
        console.log('user.exp',user.exp);
        console.log('Date.now()',Math.round(Date.now()/1000));
        if(user.exp>=currentTime){
            
              setTimeout(() => {
                    
                    setCount(user.exp-currentTime);
                }, 1000);
        }
    
        if(user.exp<currentTime){
        logout();
        return history.push('/login');
    }



    },[count])



    console.log('user',user);

    return (
    <h1 style={count<=10?{color:'red',padding:0,margin:0}:{color:'#fff',padding:0,margin:0}}>{`00:${count}`}</h1>
    );
}


const mapStateToProps=state=>({
    users:state.users
})

export default connect(mapStateToProps,{logout})(withRouter(Timer));