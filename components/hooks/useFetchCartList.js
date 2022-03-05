import { useEffect, useState } from 'react';
import { SHOES_DATA } from '../../data/shoesData';
import { getCartListUser, totalAmount } from '../../redux/user/userAction';

const API_SHOES = process.env.API_URL

const UseFetchCartList = (profile, dispatch) => {

  const [isLoading, setIsLoading] = useState(false)
  const [shoesList, setShoesList] = useState([])
  const [quantityTotal, setQuantityTotal] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [refresh, setFresh] = useState(false)


  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const res = await fetch(`${API_SHOES}cartlist?email=${profile.email}`)

      if (res.status === 200) {
        const response = await res.json()

        if (response.length !== 0) {
          const cartlist = response[0].cartlist
  
          setShoesList(cartlist)
          dispatch(getCartListUser(cartlist))
          setIsLoading(false)
        }

      } else {
        setIsLoading(false)
        console.error('Error en el fetch')
      }
      setIsLoading(false)
    })()
  }, [])

  useEffect(() => {
    let totalQ = 0
    let totalPrice = 0
    shoesList?.map(item => {
      totalQ = totalQ + item.quantity
      const filterShoe = SHOES_DATA.filter(shoeData => shoeData.id === item.id)[0]
      totalPrice = totalPrice + (item.quantity * filterShoe.price)
    })
    setQuantityTotal(totalQ)
    setTotalPrice(totalPrice)
    dispatch(totalAmount(totalPrice))
  }, [refresh, shoesList ])

  return {
    shoesList,
    //profile,
    isLoading,
    quantityTotal,
    totalPrice,
    refresh,
    setShoesList,
    setFresh
  }
};

export default UseFetchCartList;