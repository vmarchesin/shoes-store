
const Modal = ({order, setIsOpenModal}) => {
  let date = new Intl.DateTimeFormat('es-ES', { dateStyle: 'full', timeStyle: 'short' }).format(order.order.date)
  date = date.split(',')

  let facture = order.order.facture

  const factura = facture => {
    if (facture !== undefined) return facture.slice(facture.length - 9,facture.length)
    return facture
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  return (
    <>
      <div className="modal-container" onClick={handleCloseModal}></div>

      <div className="modal">
        <div className="modal__title">Bill</div>
        <div className="modal__facture-info">
          <div className="modal__facture">#{factura(facture) }</div>
          <div className="modal__date">{`${date[1]} - ${date[2]}`}</div>
          <div className="modal__total">{order.order.totalAmount} $</div>
        </div>
        <div className="modal__facture-items">
          <div className="modal__facture-item titles">
            <span className="modal__facture-item-name">Name</span>
            <span className="">Quantity</span>
            <span className="">Price</span>
            <span className="">Total </span>
          </div>
          {order.order.orderlist.map(item => (
            <div className="modal__facture-item" key={item}>
              <span className="modal__facture-item-name">{item.name}</span>
              <img className="modal__facture-item-img" src={`/images/${item.img}`} alt="" />
              <span className="">{item.quantity}</span>
              <span className="">{item.price}$</span>
              <span className="">{item.price * item.quantity}$ </span>
            </div>
          ))}
        </div>
        <div className="modal__footer">
          <div className="modal__items-quantity">{order.order.totalQuantity}</div>
          <div className="modal__footer-total">{order.order.totalAmount} $</div>
        </div>
        
      </div>
    </>
  );
};

export default Modal;