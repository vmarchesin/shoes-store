import { useDispatch } from "react-redux"
import { removeShoeCartList } from "../../redux/user/userAction"

const API_SHOES = process.env.NEXT_PUBLIC_API_URL


const UseCart = (shoesList, setShoesList, refresh, setFresh, profile ) => {

  const dispatch = useDispatch()

  const handleMore = async (id, index) => {

    let newList = shoesList
    newList[index].quantity +=  1
    shoesList[index].exist = true
    shoesList[index].email = profile.email

    const res = await fetch(`${API_SHOES}/cartlist`, {
      method: 'POST',
      body: JSON.stringify(shoesList[index])
    })

    if (res.status === 200) { 
      setShoesList(newList)
      setFresh(!refresh)
    }
  }

  const handleLess = async (id, index, quantity) => {

    if (quantity === 1) return
      
    let newList = shoesList
    newList[index].quantity -=  1
    shoesList[index].exist = true
    shoesList[index].email = profile.email

    const res = await fetch(`${API_SHOES}/cartlist`, {
      method: 'POST',
      body: JSON.stringify(shoesList[index])
    })

    if (res.status === 200) { 
      setShoesList(newList)
      setFresh(!refresh)
    }
  }

  const handleDeleteItem = async (id) => {
    let data = new Object()
    data.id = id
    data.email = profile.email
    const res = await fetch(`${API_SHOES}/cartlist?email${profile.email}`, {
      method: 'DELETE',
      body: JSON.stringify(data)
    })

    if (res.status === 200) {
      const removeItem = shoesList.filter(item => item.id !== id)
      setShoesList(removeItem)
      if (profile.email !== "") {
        dispatch(removeShoeCartList(removeItem))
      }
    }
  }

  return {
    handleMore,
    handleLess,
    handleDeleteItem
  }
}

export default UseCart