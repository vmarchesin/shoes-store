/** @jest-environment jsdom */
import React from "react";
import  Login from '../../pages/login'
import { render, screen } from "../test-utils"


describe('Login', () => {

  it('renders a heading', () => {
    render(<Login />)

    const heading = screen.getByText( /Your way is our way/i);

    expect(heading).toBeInTheDocument()

  })
})