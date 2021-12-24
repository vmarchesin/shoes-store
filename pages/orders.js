import Layout from '../components/layout/layout';
import Loading from '../components/loading/loading';
import OrderItem from '../components/orders/orderItem';
import UseFetchOrdersList from '../components/hooks/useFetchOrdersList';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

const Orders = () => {
  const profile = useSelector(state => state.user)
  const { data, isLoading } = UseFetchOrdersList()
  const router = useRouter()
  
  if (profile.email === "") {
    router.push('/')
  }

  if (profile.email === "") {
    return (
      <Layout classMain="fullpage">
      <div className="orders-container">
          {<Loading />}
      </div>
    </Layout>
    )
  }

  return (
    <Layout classMain="fullpage">
      <div className="orders-container">
        {isLoading ? <Loading /> :
         
          <div className="orders__list">
            {data.length > 0 ?
              data.map((order, index) => <OrderItem order={order} key={index} />)
              : <h2>Sin ningún pedido hasta la fecha</h2>
            }
          </div>
        }
      </div>
    </Layout>
  );
};

export default Orders;
