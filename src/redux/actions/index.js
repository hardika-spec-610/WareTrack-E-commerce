export const GET_ALL_LOGIN = "GET_ALL_LOGIN";
export const REGISTER_USER = "REGISTER_USER";
export const GET_USERS = "GET_USERS";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";
export const PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST";
export const PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS";
export const PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL";

let token = localStorage.getItem("accessToken");
console.log("token", token);

export const registerUser = (userData) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newUserData = await response.json();
        console.log("newUserData", newUserData);
        dispatch({
          type: REGISTER_USER,
          payload: newUserData,
        });
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("userdata", data.users);
        dispatch({
          type: GET_USERS,
          payload: data.users,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllProducts = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("products", data);
        dispatch({
          type: PRODUCT_LIST_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.message || error,
      });
    }
  };
};
export const productDetail = (productId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_DETAILS_REQUEST,
      });
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("singleproduct", data);
        dispatch({
          type: PRODUCT_DETAILS_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.message || error,
      });
    }
  };
};
