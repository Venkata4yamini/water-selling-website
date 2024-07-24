import React from 'react';
import './Header.css'


const Header = () => {
  return (
    <div className='header'>
    <div className="header-contents">
      <p className='p1'>
      Sip, savor, hydrate Life's essential elixir
      </p>
      <p>
       Discover AquaFlow: where hydration meets vitality. Dive into a world of pure refreshment, sourced from nature's finest. Join us on a journey of replenishment and renewal. Welcome to AquaFlow, where every drop tells a story of hydration.
      </p>
      <button >
       <a href='#explore-menu'> View Menu</a>
      </button>
    </div>
    </div>
  )
}

export default Header;