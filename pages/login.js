import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';

import { useDispatch, useSelector } from 'react-redux';
import { logout, newUSer, takeUSer, updateWishListUser } from '../redux/user/userAction';

import Layout from '../components/layout/layout';

const API_SHOES = process.env.NEXT_PUBLIC_API_URL

const Login = () => {
  const router = useRouter()

  const profile = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmitLogin =  async (e) => {
    e.preventDefault()

    let res = await fetch(`${API_SHOES}/profile?email=${formData.email}`)
    res = await res.json()

    let response = await fetch(`${API_SHOES}/wishList?email=${formData.email}`)
      .then(res => res.json())
      .then(data => response = data)
      .catch(error => console.log(error))

    if (res.password === formData.password) {
      // esta registrado y la pass es correcta
      delete res.password
      dispatch(takeUSer(response))
     // dispatch(updateWishListUser(response.wishlist))
     return router.push('/')
    }

    // Si no esta registrado
    if (!res.exist) {
      const res = await fetch(`${API_SHOES}/profile`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.status === 200) {
        dispatch(newUSer(formData))
        router.push('/')
      } else {
        console.error(res?.response)
      }
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  } 

  return (
    <Layout classMain="fullpage">
      <div className="login-container">

        <div className="login__logo">
          <div className="login__container-logo"></div>
          <div className="login__title">Comunity Shoes</div>
          <div className="login__slogan">Your way is our way</div>
        </div>

        
          <div className="login__form">
          {profile.email === '' ?
            <>
            <div className="login__info">
              <div className="login__info-tooltip"> Info login
                <span className="login__info-title">
                  Introduce un email y password cualquiera para hacer login, con esas credenciales se guardara tus deseados, carrito y pedidos
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmitLogin}>
              <div className="row">
                <label>Email</label>
                <input type="email" name="email" onChange={handleChange} required />
              </div>
              <div className="row">
                <label>password</label>
                <input type="password" name="password" onChange={handleChange} required />
              </div>
              <button>Login</button>
            </form>
            </>
            :
            <>
              <h3>Hi {profile.email}</h3>
              <button onClick={handleLogout}>Logout</button>
            </>
          }
          </div>

      </div>
    </Layout>
  );
};

export default Login;