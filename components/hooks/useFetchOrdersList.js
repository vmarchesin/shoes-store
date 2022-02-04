import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const API_SHOES = process.env.NEXT_PUBLIC_API_URL

const UseFetchOrdersList = () => {
  const profile = useSelector(state => state.user)

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const res = await fetch(`${API_SHOES}/orders?email=${profile.email}`)
        .then(res => res.json())
        .then(response => setData(response))
      
      setIsLoading(false)
    })()

  }, [])


  return {
    data,
    isLoading
  }
};

export default UseFetchOrdersList;