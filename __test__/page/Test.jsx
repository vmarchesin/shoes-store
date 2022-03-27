
import { Provider, Provider as ProviderRedux, useDispatch } from 'react-redux'
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { render, screen } from "../test-utils"

const initialState = {
  email: "",
  cartlist: [],
  orders: [],
  wishlist: []
}

export const addShoeToWishList = (data) => {
  return dispatch => {
    dispatch({
      type: 'ADD_SHOE_TO_WISHLIST',
      payload: data
    })
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SHOE_TO_WISHLIST':
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      }
    default:
      return state
  }
}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunkMiddleware)
);

export default () => {
  const dispatch = useDispatch()

  const wishlist = () => dispatch(addShoeToWishList('shoe'))
  return (
    <ProviderRedux store={store}>
      <div>
        <h1>Title</h1>
        <button onClick={wishlist}>Wishlist</button>
      </div>
    </ProviderRedux>
  )
}