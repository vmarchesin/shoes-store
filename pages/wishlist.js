import { useSelector } from 'react-redux';

import Layout from '../components/layout/layout';
import WishListItem from '../components/wishlist/wishListItem';
import UseFetchWishList from '../components/hooks/useFetchWishList';
import Loading from '../components/loading/loading';

const Wishlist = () => {
  const profile = useSelector(state => state.user)
  const wishlist  = useSelector(state => state.user.wishlist)

  const {wishList, isLoading} = UseFetchWishList(profile)
  
  return (
    <Layout classMain="fullpage">
      {isLoading ? <Loading />
       :
        <div className="wishlist-list">
          {wishlist?.length > 0 ?
            wishlist.map(shoe => (
              <WishListItem
                shoe={shoe}
                key={shoe.id}
                profile={profile}
              />
            ))
            : <h2>Ninguna zapatilla está en tu lista de deseados</h2>
          }
        </div>
      }
    </Layout>
  );
};

export default Wishlist;
