import React from 'react'

import logosvg from './images/logo-buscape.svg'
import logo from './images/buscape.png'

const Header = () => {
  return (
    <header>
      <img alt="Buscapé" srcSet={logosvg} src={logo} />
    </header>
  )
}

export default Header
