import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const NavMain = () => {
  const router = useRouter()
  const profile = useSelector(state => state.user)

  return (
    <ul className="nav-home">
      <li>
        <Link href="/">
          <a> 
            Home
          </a>
        </Link>
      </li>
      {profile.email !== "" &&
        <>
          <li>
            <Link href="/orders" >
              <a className={router.route === '/orders' ? 'active' : ''}>
                orders
              </a>
            </Link>
          </li>
          <li>
            <Link href="/wishlist" >
              <a className={router.route === '/wishlist' ? 'active' : ''}>
                Wishlist
              </a>
            </Link>
          </li>
        </>
      }
      <li>
        <Link href="/cart" >
          <a className={router.route === '/cart' ? 'active' : ''}>
            Cart
            {profile.cartTotal > 0 && <span className="nav-home__counter-cart" >{profile.cartTotal}</span> }
          </a>
        </Link>
      </li>
      <li>
        <Link href="/login" >
          <a className={router.route === '/login' ? 'active' : ''}>
            login
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default NavMain;