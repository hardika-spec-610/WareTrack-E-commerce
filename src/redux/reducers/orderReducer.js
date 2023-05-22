import {
  ORDER_CREATE_ERROR,
  ORDER_CREATE_LOADING,
  ORDER_CREATE_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
} from "../actions";

const initialState = {
  order: [],
  isLoading: true,
  isError: false,
};

export const orderCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CREATE_SUCCESS:
      return {
        success: true,
        order: action.payload,
        isLoading: false,
      };
    case ORDER_CREATE_LOADING:
      //   console.log(action.payload);
      return {
        ...state,
        isLoading: action.payload,
      };

    case ORDER_CREATE_ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    // case ORDER_CREATE_RESET:
    //   return {};
    default:
      return state;
  }
};
// export const orderDeatilsReducer = (
//   state = { isLoading: true, isError: false, order: [] },
//   action
// ) => {
//   switch (action.type) {
//     case ORDER_DETAILS_SUCCESS:
//       return {
//         ...state,
//         orders: action.payload,
//       };
//     case ORDER_DETAILS_LOADING:
//       //   console.log(action.payload);
//       return {
//         ...state,
//         isLoading: action.payload,
//       };

//     case ORDER_DETAILS_ERROR:
//       return {
//         ...state,
//         isError: action.payload,
//       };
//     default:
//       return state;
//   }
// };
export const orderPayReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        order: action.payload,
        success: true,
        isLoading: false,
        isError: false,
      };
    // case ORDER_PAY_REQUEST:
    //   //   console.log(action.payload);
    //   return {
    //     ...state,
    //     isLoading: true,
    //     isError: false,
    //   };

    case ORDER_PAY_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    // case ORDER_PAY_RESET:
    //   return {};
    default:
      return state;
  }
};
