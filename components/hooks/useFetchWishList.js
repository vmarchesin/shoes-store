import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWishListUser } from '../../redux/user/userAction';

const API_SHOES = process.env.NEXT_PUBLIC_API_URL

const UseFetchWishList = (profile) => {

  // const profile = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [wishList, setWishList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    (async () => {
      setIsLoading(true)
      await fetch(`${API_SHOES}/wishList?email=${profile.email}`)
        .then(res => res.json())
        .then(response => {
          setWishList(response.wishlist)
          dispatch(updateWishListUser(response.wishlist))
          setIsLoading(false)
        })
    })()

  }, [])

  return {
    wishList,
    isLoading
  }
};

export default UseFetchWishList;