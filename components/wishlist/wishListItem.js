import UseWishList from '../hooks/useWishList';

const WishListItem = ({ shoe, profile }) => {
  
  if (typeof shoe === 'string') {
    shoe = JSON.parse(shoe)
  }

  const {
    handleAddToCart,
    handleRemove
  } = UseWishList(shoe, profile)


  return (
    <div className="wishlist-item">
      <div className="wishlist-item__img" style={{backgroundImage: `url(/images/${shoe.img})`}}></div>
      <div className="wishlist-item__name">{shoe.name}</div>
      <div className="wishlist-item__short">{shoe.short}</div>
      <div className="wishlist-item__price">{shoe.price} $</div>

      <button className="wishlist-item__add-cart" onClick={handleAddToCart}>MOVE TO BAG</button>
      <div className="wishlist-item__remove" onClick={handleRemove}>Remove</div>

    </div>
  );
};

export default WishListItem;