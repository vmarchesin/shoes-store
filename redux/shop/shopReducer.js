import { UPDATE_CART } from "./shopActionTypes"

const initialState = {
  packs: 0,
  total: 0,
  infoText: '',
  items: []
}

export const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART:
      return action.payload

    default:
      return state
  }
}