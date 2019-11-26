import { GET_USERS, LOGIN, LOADING, UPDATE_COUNT } from "../actions/types";
import myProfilePic from "../assets/user-profile-1.jpg";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  users: [],
  count: 60,
  //Currently the avatar is not being fetched from the database, just a random image, in future it will be :)
  avatar: myProfilePic
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };

    case UPDATE_COUNT:
      return {
        ...state,
        count: action.payload
      };

    case LOGIN:
      return {
        ...state,
        loading: false,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user
      };

    default:
      return state;
  }
};

export default userReducer;
