import {
  USER,
  NEW_USER,
  UPDATE_WISHLIST_USER,
  REMOVE_SHOE_CARTLIST,
  TOTAL_AMOUNT,
  REMOVE_CARTLIST,
  LOGOUT,
  GET_CARTLIST_USER,
  ADD_SHOE_CARTLIST,
  ADD_SHOE_TO_WISHLIST,
  REMOVE_SHOE_TO_WISHLIST,
  RESET_USER
} from "./userActionTypes"

const initialState = {
  email: "",
  cartlist: [],
  orders: [],
  wishlist: []
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        email: action.payload.email,
        id: action.payload._id,
        wishlist: action.payload.wishlist
      }
    
    case NEW_USER:
      return {
        ...state,
        email: action.payload.email,
        // id: action.payload._id,
        // wishlist: action.payload.wishlist
      }

    case GET_CARTLIST_USER:
      return {
        ...state,
        cartlist: action.payload
      }
  
    case ADD_SHOE_CARTLIST:
      return {
        ...state,
        cartlist: [action.payload]
      }

    case UPDATE_WISHLIST_USER:
      return {
        ...state,
        wishlist: action.payload
      }
    
    case ADD_SHOE_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      }
    
    case REMOVE_SHOE_TO_WISHLIST:
      return {
        ...state,
        wishlist: action.payload
      }
    
    case REMOVE_SHOE_CARTLIST:
      return {
        ...state,
        cartlist: action.payload
      }
    
    case TOTAL_AMOUNT:
      return {
        ...state,
        totalAmount: action.payload
      }
    
    case REMOVE_CARTLIST:
      return {
        ...state,
        cartlist: action.payload
      }
    
    case RESET_USER:
      return {
        ...state,
        initialState
      }
    
    case LOGOUT:
      return initialState
      

    default:
      return state
  }
}