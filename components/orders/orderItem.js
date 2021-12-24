import React, { useState } from 'react';
import Modal from '../modal/modal';

const OrderItem = ({ order }) => {

  const [isOpenModal, setIsOpenModal] = useState(false)
  
  let date = new Intl.DateTimeFormat('es-ES', { dateStyle: 'full', timeStyle: 'short' }).format(order.order.date)
  date = date.split(',')

  let facture = order.order.facture

  const factura = facture => {
    if (facture !== undefined) return facture.slice(facture.length - 9,facture.length)
    return facture
  }

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <div className="orders__item">
        <div>
          <div className="orders__order-head">
            <div className="orders__order-info-top">
              <div className="orders__order-num">#{factura(facture) }</div>
              <div className="orders__order-date">{`${date[1]} - ${date[2]}`}</div>
            </div>
            <div className="orders__order-price">{order.order.totalAmount} $</div>
          </div>
          
          <div className="orders__order-items-list">
            {order.order.orderlist.map(shoe => (
              <div className="orders__order-items" key={shoe}>{ shoe.name }</div>
            ))}

          </div>
          <div className="orders__order-quantity">total items - {order.order.orderlist.length}</div>
          <div className="orders__order-quantity">total quantity - {order.order.totalQuantity}</div>
        </div>
          
        <div className="orders__order-footer">
          <div className="orders__order-facture-detail">
            <img src="/images/bill.png" alt="bill" onClick={handleOpenModal } />
          </div>
        </div>

      </div>
      {isOpenModal && <Modal order={order} setIsOpenModal={setIsOpenModal }/> }
    
    </>
  );
};

export default OrderItem;