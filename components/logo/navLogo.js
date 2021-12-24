import Link from 'next/link';

const NavLogo = () => {
  return (
    <div className="header__container-logo">
      <Link href="/">
        <a>
          <img src="/images/logo-shoes.png" alt="logo marca" />  
        </a>
      </Link>
    </div>
  );
};

export default NavLogo;