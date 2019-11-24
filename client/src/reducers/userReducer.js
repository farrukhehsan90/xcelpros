import {GET_USERS,LOGIN,LOADING} from '../actions/types';

const initialState={
    loading:false,
    isAuthenticated:false,
    user:{},
    users:[]

}

const userReducer=(state=initialState,action)=>{

    switch (action.type) {

        case GET_USERS:
            return {
                ...state,
                loading:false,
                users:action.payload
            }
        case LOADING:
            return {
                ...state,
                loading:true
            }

        case LOGIN:
            return{
                ...state,
                loading:false,
                isAuthenticated:action.payload.isAuthenticated,
                user:action.payload.user

            }

        default:
            return state;


    }



}


export default userReducer;