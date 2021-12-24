import { useDispatch } from "react-redux";
import { updateWishListUser } from "../../redux/user/userAction";

const UseWishList = (shoe, profile) => {

  const dispatch = useDispatch()

  const handleAddToCart = async () => {
    let shoeToDB = new Object()
    shoeToDB.id = shoe.id
    shoeToDB.quantity = 1
    shoeToDB.email = profile.email

    let res = await fetch(`/api/cartlist?email=${profile.email}`)
    res = await res.json()
    
    if (res[0].cartlist !== undefined) {
      let isShoeInCart = res[0].cartlist.filter(item => item.id === shoe.id)
      if (isShoeInCart.length > 0) {
        // si existe en cart borramos sin sumar
        handleRemove()

      } else {
        const res = await fetch("/api/cartlist", {
          method: 'POST',
          body: JSON.stringify(shoeToDB)
        })
      }
    } else {
      const res = await fetch("/api/cartlist", {
        method: 'POST',
        body: JSON.stringify(shoeToDB)
      })
    }
    handleRemove()
  }


  const handleRemove = async () => {
    let data = {
      id: shoe.id,
      email: profile.email
    }

    const res = await fetch("/api/wishList", {
      method: 'DELETE',
      body: JSON.stringify(data)
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