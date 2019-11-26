import { GET_USERS,LOGIN,LOADING ,UPDATE_COUNT} from './types';
import decode from 'jwt-decode';
import axios from 'axios';
import setAuthToken from '../utils/fetcher';
import store from '../store/store';

export const getUsers=()=>dispatch=>{
    dispatch(setLoading());
    fetch('http://localhost:5000/users',{
        method:"GET"
    })
    .then(res=>res.json())
    .then(users=>{
     
        
  
        return dispatch({
            type:GET_USERS,
            payload:users
        })
    });


}


export const updateCount=(logout,history)=>dispatch=>{
   
    const {users:{user}}=store.getState();
   
    if(Object.keys(user).length>0){

        const currentTime=Math.round(Date.now()/1000);
        if(user.exp>=currentTime){
            
              setTimeout(() => {
                dispatch(setCount(user.exp-currentTime))       
                }, 1000);
        }
    
        if(user.exp<currentTime){
            logout();
            return history.push('/login');
        }


    }

    
}
export const login=(email,password,history)=>dispatch=>{
    dispatch(setLoading());
    axios.post('http://localhost:5000/users/login',{email,password},{headers:{
        "Content-Type":"application/json"
    }})
    .then(res=>{
        const {token,success}=res.data;
        const decoded=token?decode(token):res.err;
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
        
        dispatch({
        type:LOGIN,
        payload:{
            isAuthenticated:false,
            user:Object.keys(error.response).length>0?error.response.data:{}
        }
    })})


}
export const register=(user,history)=>dispatch=>{
    dispatch(setLoading());
    axios.post('http://localhost:5000/users/register',user,{
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        const {user}=res.data;
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
    .catch(error=>{
        dispatch({
            type:LOGIN,
            payload:{ 
                    isAuthenticated:false,
                   user:Object.keys(error.response).length>0?error.response.data:{}
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

export const setCount=(count)=>({
    type:UPDATE_COUNT,
    payload:count
})

export const setLoading=()=>{
    return {
        type:LOADING
    }
}