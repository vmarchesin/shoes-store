
import Layout from '../../components/layout/layout';
import IconHeart from '../../components/icons/iconHeart';

import BestSellers from '../../components/bestSellers/bestSellers';
import UseDetailShoes from '../../components/hooks/useDetailShoes';
import Loading from '../../components/loading/loading';

const ShoesDetail = () => {

  const {
    shoe,
    quantity,
    router,
    stroke,
    bestSellers,
    isLoading,
    profile,
    setQuantity,
    handleOneLess,
    handleToCart,
    handleAddWishList
  } = UseDetailShoes()

  return (
    <Layout classMain="fullpage">
      <section className="detail-shoe">
        {isLoading && <Loading />}
        <div className="detail-shoe__container-img" >
          <div className="detail-shoe__img" style={{ backgroundImage: `url(/images/${shoe?.img})`}} ></div>
        </div>

        <div className="detail-shoe__info">
          <h1 className="detail-shoe__name">{ shoe?.name }</h1>
          <div className="detail-shoe__price">{ shoe?.price } $</div>
          <div className="detail-shoe__description">{shoe?.description}</div>
          <div className="detail-shoe__add-cart">

            <div className="detail-shoe__quantity">
              <div className="detail-shoe__quantity-button" onClick={handleOneLess}>
                <img src="/images/icon-less.svg" alt="icon-less"/>
              </div>
              {/* <input type="text" value={quantity} /> */}
              <div className="detail-shoe__quantity-number">{quantity} </div>
              <div className="detail-shoe__quantity-button" onClick={() => setQuantity(quantity + 1)}>
                <img src="/images/icon-more.svg" alt="icon-more"/>
              </div>
            </div>

            <button onClick={handleToCart}> ADD TO CART </button>
          </div>
          {profile.email !== "" &&
          <div className="detail-shoe__wishlist" onClick={handleAddWishList}>
            <IconHeart stroke={stroke} />
            {stroke === 'black' ? 'ADD ': 'REMOVE '}
            TO WISHLIST
          </div>
          }
        </div>
      </section>

      <BestSellers
        bestSellers={bestSellers}
        routerUrl={router.query.name}
      />

    </Layout>
  );
};

export default ShoesDetail;