export const GET_ALL_LOGIN = "GET_ALL_LOGIN";
export const REGISTER_USER = "REGISTER_USER";
export const GET_USERS = "GET_USERS";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";
export const PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST";
export const PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS";
export const PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL";
export const CART_ADD_ITEM = "CART_ADD_ITEM";
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";
export const GET_ME = "GET_ME";
export const GET_ME_LOADING = "GET_ME_LOADING";
export const GET_ME_ERROR = "GET_ME_ERROR";
export const USER_LOGOUT = "USER_LOGOUT";
export const CART_SAVE_SHIPPING_ADDRESS = "CART_SAVE_SHIPPING_ADDRESS";
export const CART_SAVE_PAYMENT_METHOD = "CART_SAVE_PAYMENT_METHOD";
export const CART_CLEAR_ITEMS = "CART_CLEAR_ITEMS";
export const ORDER_CREATE_REQUEST = "ORDER_CREATE_REQUEST";
export const ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS";
export const ORDER_CREATE_FAIL = "ORDER_CREATE_FAIL";
export const ORDER_CREATE_RESET = "ORDER_CREATE_RESET";
export const ORDER_DETAILS_LOADING = "ORDER_DETAILS_LOADING";
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_ERROR = "ORDER_DETAILS_ERROR";
export const ORDER_PAY_REQUEST = "ORDER_PAY_REQUEST";
export const ORDER_PAY_SUCCESS = "ORDER_PAY_SUCCESS";
export const ORDER_PAY_FAIL = "ORDER_PAY_FAIL";
export const ORDER_PAY_RESET = "ORDER_PAY_RESET";

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
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
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

export const userProfile = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("profile", data);
        dispatch({
          type: GET_ME,
          payload: data,
        });
        dispatch({
          type: GET_ME_LOADING,
          payload: false,
        });
      } else {
        dispatch({
          type: GET_ME_LOADING,
          payload: false,
        });
        dispatch({
          type: GET_ME_ERROR,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_ME_LOADING,
        payload: false,
      });
      dispatch({
        type: GET_ME_ERROR,
        payload: true,
      });
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
        console.log("cartpro", data);
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

export const addToCart = (productId, qty) => {
  return async (dispatch, getState) => {
    try {
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
        console.log("cartdetails", data);
        dispatch({
          type: CART_ADD_ITEM,
          payload: {
            product: data._id,
            name: data.name,
            imageUrl: data.imageUrl,
            price: data.price,
            quantity: data.quantity,
            qty,
          },
        });
        localStorage.setItem(
          "cartItems",
          JSON.stringify(getState().cart.cartItems)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeFromCart = (productId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId,
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    localStorage.removeItem(token);
    console.log("removetoken", localStorage.removeItem("accessToken"));
    try {
      dispatch({
        type: USER_LOGOUT,
      });
      document.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };
};

export const saveShippingAddress = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
      });
      localStorage.setItem("shippingAddress", JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };
};
export const savePaymentMethod = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
      });
      localStorage.setItem("paymentMethod", JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({
      //   type: ORDER_CREATE_REQUEST,
      // });
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/orders`, {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("orderCreate", data);
        dispatch({
          type: ORDER_CREATE_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: error.message || error,
      });
    }
  };
};

export const getOrderDetails = (orderId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("orderDetails", data);
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          payload: data,
        });
        dispatch({
          type: ORDER_DETAILS_LOADING,
          payload: false,
        });
      } else {
        dispatch({
          type: ORDER_DETAILS_LOADING,
          payload: false,
        });
        dispatch({
          type: ORDER_DETAILS_ERROR,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_LOADING,
        payload: false,
      });
      dispatch({
        type: ORDER_DETAILS_ERROR,
        payload: true,
      });
    }
  };
};

export const payOrder = (paymentResult, orderId) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({
      //   type: ORDER_PAY_REQUEST,
      // });
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/orders/${orderId}/pay`,
        {
          method: "PUT",
          body: JSON.stringify(paymentResult),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("orderCreate", data);
        dispatch({
          type: ORDER_PAY_SUCCESS,
          payload: data,
        });
        dispatch({
          type: CART_CLEAR_ITEMS,
          payload: data,
        });
        localStorage.removeItem("cartItems", JSON.stringify(data));
      }
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: error.message || error,
      });
    }
  };
};
