import { GET_ME, GET_ME_ERROR, GET_ME_LOADING } from "../actions";

const initialState = {
  user: null,
  isLoading: true,
  isError: false,
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ME:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ME_LOADING:
      //   console.log(action.payload);
      return {
        ...state,
        isLoading: action.payload,
      };

    case GET_ME_ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return state;
  }
};

export default userProfileReducer;
