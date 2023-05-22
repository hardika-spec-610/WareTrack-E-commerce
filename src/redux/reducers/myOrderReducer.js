import {
  MY_ORDER_DETAILS_ERROR,
  MY_ORDER_DETAILS_LOADING,
  MY_ORDER_DETAILS_SUCCESS,
} from "../actions";

const initialState = {
  orders: [],
  isLoading: true,
  isError: false,
};

const myOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };
    case MY_ORDER_DETAILS_LOADING:
      //   console.log(action.payload);
      return {
        ...state,
        isLoading: action.payload,
      };

    case MY_ORDER_DETAILS_ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return state;
  }
};

export default myOrderReducer;
