import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UseFetchOrdersList = () => {
  const profile = useSelector(state => state.user)

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const res = await fetch(`/api/orders?email=${profile.email}`)
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