import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SHOES_DATA } from '../../data/shoesData';

const CartList = ({ shoe, handleDeleteItem, handleMore, handleLess, index }) => {

  const [shoeData, setShoeData] = useState()
  
  useEffect(() => {
    setShoeData(SHOES_DATA.filter(shoeData => shoeData.id === shoe.id)[0])
  }, [])

  return (
    <div className="cart-list">
      <Link href={`/shoes/${shoeData?.nameUrl}`} >
        <a>
          <div className="cart-list__name">{shoeData?.name}</div>
        </a>
      </Link>
      <Link href={`/shoes/${shoeData?.nameUrl}`} >
        <a>
          <div className="cart-list__img" style={{ backgroundImage: `url(/images/${shoeData?.img})` }}></div>
        </a>
      </Link>
      <div className="cart-list__short">{shoeData?.short}</div>

      <div className="detail-shoe__quantity">
        <div className="detail-shoe__quantity-button" onClick={() => handleLess(shoe.id, index, shoe.quantity)}>
          <img src="/images/icon-less.svg" />
        </div>
        <input type="text" value={shoe.quantity} />
        {/* <div> {shoe.quantity} </div> */}
        <div className="detail-shoe__quantity-button" onClick={() => handleMore(shoe.id, index)}>
          <img src="/images/icon-more.svg" />
        </div>
      </div>

      {/* <div className="cart-list__quantity">{shoe.quantity}</div> */}
      <div className="cart-list__price">{shoeData?.price} $</div>
      <div className="cart-list__total">{shoeData?.price * shoe.quantity} $</div>
      <span className="cart-list__delete" onClick={() => handleDeleteItem(shoe.id)}>
        <img src="/images/icon-close.png" alt="close" />
      </span>
    </div>
  );
};

export default CartList;