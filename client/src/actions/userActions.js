import { GET_USERS,LOGIN,LOADING } from './types';
import decode from 'jwt-decode';
import axios from 'axios';
import setAuthToken from '../utils/fetcher';

export const getUsers=()=>dispatch=>{
    dispatch(setLoading());
    fetch('http://localhost:5000/users',{
        method:"GET"
    })
    .then(res=>res.json())
    .then(users=>{
        console.log('users',users)
        
  
        return dispatch({
            type:GET_USERS,
            payload:users
        })
    });


}

export const login=(email,password,history)=>dispatch=>{
    dispatch(setLoading());
    axios.post('http://localhost:5000/users/login',{email,password},{headers:{
        "Content-Type":"application/json"
    }})
    .then(res=>{
        console.log('yaha')
        console.log('res',res);
        const {token,success}=res.data;
        const decoded=token?decode(token):res.err;
        console.log('user',decoded);
        if(token){

            localStorage.setItem('token',token);
            setAuthToken(token);
        }
       
        dispatch({
            type:LOGIN,
            payload:{
                isAuthenticated:token?Object.keys(decoded).length>0:false,
                user:decoded
            }
        })
        if(success){

            return history.push('/');
        }

    })
    .catch(error=>{
        const {err}=error.response.data;
    //    console.log('err',err.response);
        dispatch({
        type:LOGIN,
        payload:{
            isAuthenticated:false,
            user:err
        }
    })})


}
export const register=(user,history)=>dispatch=>{
    console.log('user fetch',user);
    dispatch(setLoading());
    fetch('http://localhost:5000/users/register',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(user=>{
        console.log('user',user);
        const decoded=user.token?decode(user.token):user.err;
        if(user.token){

            localStorage.setItem('token',user.token);
        }

        dispatch({
            type:LOGIN,
            payload:{
            isAuthenticated:user.token?Object.keys(decoded).length>0:false,
            user:decoded
            }
        })
        if(user.success){

            return history.push('/');
        }
    })
    .catch(err=>{
        console.log('err');
        dispatch({
            type:LOGIN,
            payload:{ 
                    isAuthenticated:false,
                    user:err 
            }
        })
    })


}

export const setCurrentUser=(user)=>{


    return {
        type:LOGIN,
        payload:{
            isAuthenticated:Object.keys(user).length>0,
            user
        }
    }

}

export const logout=()=>{

    localStorage.removeItem('token');
    setAuthToken(false);

    return {
        type:LOGIN,
        payload:{
            isAuthenticated:false,
        user:{}
        }
    }
}

export const setLoading=()=>{
    return {
        type:LOADING
    }
}