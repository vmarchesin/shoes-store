import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { SHOES_DATA } from "../../data/shoesData";
import { addShoeCartList, addShoeToWishList, removeShoeToWishList } from "../../redux/user/userAction";

const API_SHOES = process.env.API_URL

const UseDetailShoes = () => {

  const router = useRouter()
  const profile = useSelector(state => state.user)
  var pathname = window.location.pathname
  let path = pathname.split('/')[2]

  const dispatch = useDispatch()
  
  const [isLoading, setIsLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [stroke, setStroke] = useState('black')
  const [bestSellers, setBestSellers] = useState([])
  
  const shoe = SHOES_DATA.find(item => item.nameUrl === path)


  useEffect(() => {
    if (profile.wishlist?.length > 0) {
      let isInWishlist = profile.wishlist.find(item => item.id === shoe.id)
      if(isInWishlist !== undefined) return setStroke('green')
    }
  }, [])

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_SHOES}bestSellers`)
        .then(res => res.json())
        .then(res => {
          let bestSellers = []
          for (let index = 0; index < SHOES_DATA.length; index++) {
          for (let z = 0; z < res.length; z++) {
            if (SHOES_DATA[index].id === res[z].id) {
              if (SHOES_DATA[index].nameUrl !== router.query.name) {
                if (bestSellers.length <= 3) {
                  bestSellers.push(SHOES_DATA[index])
                }
              } 
            }
          }
        }
        setBestSellers(bestSellers)
        })
    })()
  },[router.asPath])

  const handleOneLess = () => {
    if (quantity === 1) return
    setQuantity(quantity - 1)
  }

  const handleToCart = async () => {
    setIsLoading(true)
    let shoeToDB = new Object()
    shoeToDB.id = shoe.id
    shoeToDB.quantity = quantity
    shoeToDB.email = profile.email

    const res = await fetch(`${API_SHOES}cartlist?email=${profile.email}`)

    if (res.status === 200) {
      const resJson = await res.json()

      if (resJson.length === 0) {
        shoeToDB.isNew = true
        const res = await fetch(`${API_SHOES}cartlist`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(shoeToDB)
        })

        delete shoeToDB.email
        delete shoeToDB.isNew
        dispatch(addShoeCartList(shoeToDB))
        return setIsLoading(false)
      }
      
      if (resJson.length > 0) {
        const cartList = resJson[0].cartlist
        
        let isShoeInCart = cartList?.filter(item => item.id === shoe.id)

        if (isShoeInCart.length === 0) {
          const res = await fetch(`${API_SHOES}cartlist`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
             body: JSON.stringify(shoeToDB)
          })

          delete shoeToDB.email
          dispatch(addShoeCartList(shoeToDB))
          setIsLoading(false)
        } else {
          isShoeInCart[0].quantity = isShoeInCart[0].quantity + quantity
          isShoeInCart[0].exist = true
          isShoeInCart[0].email = profile.email

          const res = await fetch(`${API_SHOES}cartlist`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(isShoeInCart[0])
          })
          dispatch(addShoeCartList(shoeToDB))
          setIsLoading(false)
        }
      }
    }
    setIsLoading(false)
  }
    

  const handleAddWishList = async () => {
    if (stroke === 'black') {
      setStroke('green')
      shoe.email = profile.email
      const res = await fetch(`${API_SHOES}wishList`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shoe)
      })

      if (res.status === 200) {
        delete shoe.email
        dispatch(addShoeToWishList(shoe))
      }

    } else {
      setStroke('black')
      let  existShoe = new Object()
      existShoe.id = shoe.id 
      existShoe.email = profile.email
      const res = await fetch(`${API_SHOES}wishList`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(existShoe)
      })

      if (res.ok) {
        const updateWishlist = profile.wishlist.filter(item => item.id !== shoe.id) 
        dispatch(removeShoeToWishList(updateWishlist))
      }
    }
  }

  return {
    shoe,
    quantity,
    router,
    isLoading,
    profile,
    setQuantity,
    stroke,
    bestSellers,
    handleOneLess,
    handleToCart,
    handleAddWishList
  }
};

export default UseDetailShoes;