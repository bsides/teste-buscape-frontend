import React from 'react'
import logosvg from './images/logo-buscape.svg'
import logo from './images/buscape.png'

const Header = () => {
  return (
    <div>
      <img alt="Buscapé" srcSet={logosvg} src={logo} />
    </div>
  )
}

export default Header
