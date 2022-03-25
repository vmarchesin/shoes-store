/** @jest-environment jsdom */
import React from "react";
import  Login from '../../pages/login'
import { render } from "@testing-library/react"


describe('Login', () => {

    it('renders a heading', () => {
        const component = render(<Login />)
        console.log('component', component);

       /*  const heading = screen.getByRole('heading', {
          name: /welcome to next\.js!/i,
        })
    
        expect(heading).toBeInTheDocument() */
      })


    
})