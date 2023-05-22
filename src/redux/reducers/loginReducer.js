import { GET_ALL_LOGIN, LOGOUT, SET_ACCESS_TOKEN } from "../actions";

const initialState = {
  loginUser: null,
  isLoggedIn: false,
  accessToken: localStorage.getItem("accessToken") || null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LOGIN:
      return {
        ...state,
        loginUser: action.payload,
        isLoggedIn: true, // Set isLoggedIn to true
      };
    case SET_ACCESS_TOKEN:
      localStorage.setItem("accessToken", action.payload);
      return {
        ...state,
        accessToken: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("accessToken");
      return {
        ...state,
        loginUser: null,
        isLoggedIn: false,
        accessToken: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
