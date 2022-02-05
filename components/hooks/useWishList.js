import { useDispatch } from "react-redux";
import { updateWishListUser } from "../../redux/user/userAction";

const API_SHOES = process.env.NEXT_PUBLIC_API_URL

const UseWishList = (shoe, profile) => {

  const dispatch = useDispatch()

  const handleAddToCart = async () => {
    let shoeToDB = new Object()
    shoeToDB.id = shoe.id
    shoeToDB.quantity = 1
    shoeToDB.email = profile.email

    let res = await fetch(`${API_SHOES}cartlist?email=${profile.email}`)
    res = await res.json()

    if (res.length === 0) {
      const res = await fetch(`${API_SHOES}cartlist`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shoeToDB)
      })
    } else if (res[0].cartlist !== undefined) {

      let isShoeInCart = res[0].cartlist.filter(item => item.id === shoe.id)
      if (isShoeInCart.length > 0) {
        // si existe en cart borramos sin sumar
        handleRemove()

      } else {
        const res = await fetch(`${API_SHOES}cartlist`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(shoeToDB)
        })
      }
    } else {
      console.log("otro Else")
      const res = await fetch(`${API_SHOES}cartlist`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shoeToDB)
      })
    }
    handleRemove()
  }

  const handleRemove = async () => {

    const res = await fetch(`${API_SHOES}wishlist?email=${profile.email}&id=${shoe.id}`, {
      method: 'DELETE',
    })

    if (res.ok == 1) {
      const updateWishlist = profile.wishlist.filter(item => item.id !== shoe.id)
      dispatch(updateWishListUser(updateWishlist))
    }
  }

  return {
    handleAddToCart,
    handleRemove
  }
};

export default UseWishList;