import React from 'react';

const CartTitles = () => {
  return (
    <div className="cart-list title">
      <div className="cart-list__name">Nombre</div>
      <div className="cart-list__img">Img</div>
      <div className="cart-list__short">Descripción</div>
      <div className="cart-list__quantity">Cantidad</div>
      <div className="cart-list__price">Precio</div>
      <div className="cart-list__total">Total</div>
  </div>
  );
};

export default CartTitles;