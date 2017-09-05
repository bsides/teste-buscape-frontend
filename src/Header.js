import React from 'react'

import logosvg from './images/logo-buscape.svg'
import logo from './images/buscape.png'

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-light bg-yellow justify-content-between">
        <a className="navbar-brand">
          <img alt="Buscapé logo" srcSet={logosvg} src={logo} />
        </a>
        <button type="button">menu</button>
      </nav>
    </header>
  )
}

export default Header
