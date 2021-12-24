import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';

import Layout from '../components/layout/layout';
import CartList from '../components/cart/cartList';
import CartTitles from '../components/cart/cartTitles';
import UseFetchCartList from '../components/hooks/useFetchCartList';
import Loading from '../components/loading/loading';
import UseCart from '../components/hooks/useCart';

export default function Cart() {
  const profile = useSelector(state => state.user)
  const dispatch = useDispatch()

  const {
    shoesList,
    isLoading,
    quantityTotal,
    totalPrice,
    refresh,
    setShoesList,
    setFresh
  } = UseFetchCartList(profile, dispatch)

  const {
    handleMore,
    handleLess,
    handleDeleteItem
  } = UseCart(shoesList, setShoesList, refresh, setFresh, profile, dispatch )
 

  return (
    <Layout classMain="fullpage">
      {isLoading && <Loading />}
      <div className="cart-container">
      { shoesList !== undefined && shoesList.length > 0 ?
        <>
          <CartTitles />
         {shoesList.map((shoe, index) => (
          <CartList
            shoe={shoe}
            key={shoe.id}
            index={index}
            handleDeleteItem={handleDeleteItem}
            handleMore={handleMore}
            handleLess={handleLess}
          />
        ))}
        <div className="cart-total">
          <div className="cart-total__quantity">{ quantityTotal }</div>
          <div className="cart-total__total">{ totalPrice } $</div>
        </div>
            <div className="cart-pay-container">
              {profile.email !== '' ?
                <Link href="/checkout">
                  <a>
                    <button className="cart-pay__button">Checkout</button>
                  </a>
                </Link>
                :
                <Link href="/login">
                  <a>
                    <button className="cart-pay__button">Checkout</button>
                  </a>
                </Link>
              }
        </div>
        </>
        : <h3>Tu carro esta vacio</h3>
      }
      </div>
    </Layout>
  );
};
