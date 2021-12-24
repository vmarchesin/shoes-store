import * as types from './userActionTypes'

export const takeUSer = (user) => {
  return dispatch => {
    dispatch({
      type: types.USER,
      payload: user
    })
  }
}

export const newUSer = (user) => {
  return dispatch => {
    dispatch({
      type: types.NEW_USER,
      payload: user
    })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: types.LOGOUT
    })
  }
}

export const updateWishListUser = (data) => {
  return dispatch => {
    dispatch({
      type: types.UPDATE_WISHLIST_USER,
      payload: data
    })
  }
}

export const addShoeToWishList = (data) => {
  return dispatch => {
    dispatch({
      type: types.ADD_SHOE_TO_WISHLIST,
      payload: data
    })
  }
}

export const removeShoeToWishList = (data) => {
  return dispatch => {
    dispatch({
      type: types.REMOVE_SHOE_TO_WISHLIST,
      payload: data
    })
  }
}

export const getCartListUser = (data) => {
  return dispatch => {
    dispatch({
      type: types.GET_CARTLIST_USER,
      payload: data
    })
  }
}

export const addShoeCartList = (data) => {
  return dispatch => {
    dispatch({
      type: types.ADD_SHOE_CARTLIST,
      payload: data
    })
  }
}

export const removeShoeCartList = (data) => {
  return dispatch => {
    dispatch({
      type: types.REMOVE_SHOE_CARTLIST,
      payload: data
    })
  }
}

export const totalAmount = (data) => {
  return dispatch => {
    dispatch({
      type: types.TOTAL_AMOUNT,
      payload: data
    })
  }
}

export const removeCartList = (data) => {
  return dispatch => {
    dispatch({
      type: types.REMOVE_CARTLIST,
      payload: data
    })
  }
}

export const resetUser = (data) => {
  return dispatch => {
    dispatch({
      type: types.RESET_USER,
      payload: data
    })
  }
}