/** @jest-environment jsdom */
import React from "react";
import Test from './Test'
import { Provider, Provider as ProviderRedux } from 'react-redux'
import renderer from 'react-test-renderer'

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

export const resetStore = () => {
  return dispatch => {
    dispatch({
      type: 'RESET_STORE',
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
    case 'RESET_STORE':
      return initialState
    default:
      return state
  }
}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunkMiddleware)
);

beforeEach(() => {
  store.dispatch(resetStore())
})

describe('Test-', () => {
  it('renders a heading', () => {
    render(<ProviderRedux store={store}><Test /></ProviderRedux>)

    const heading = screen.getByText(/Title/i);

    expect(heading).toBeInTheDocument()
  })

  it('adds a shoe to wishlist on store', () => {
    render(<ProviderRedux store={store}><Test /></ProviderRedux>)
    store.dispatch(addShoeToWishList('shoe'))
    expect(store.getState()).toEqual({ email: '', cartlist: [], orders: [], wishlist: [ 'shoe' ] })
  })

  it('adds a shoe to wishlist on click', () => {
    render(<ProviderRedux store={store}><Test /></ProviderRedux>)

    const wishlistButton = screen.getByText(/Wishlist/i);
    expect(wishlistButton).toBeInTheDocument()
    wishlistButton.click()

    expect(store.getState()).toEqual({ email: '', cartlist: [], orders: [], wishlist: [ 'shoe' ] })
  })

  it('matches snapshot', () => {
    const tree = renderer
      .create(<ProviderRedux store={store}><Test /></ProviderRedux>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })
})