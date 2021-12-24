import React from 'react';
import NavLogo from '../logo/navLogo';
import NavMain from '../nav/navMain';

const Header = () => {
  return (
    <header className="header">
      <NavLogo />
      <NavMain />
    </header>
  );
};

export default Header;