import React, { Component } from 'react'
import { array } from 'prop-types'

import logosvg from './images/logo-buscape.svg'
import logo from './images/buscape.png'

class Header extends Component {
  static propTypes = {
    data: array
  }
  state = {
    menu: false
  }
  toggleMenu = () => {
    const menu = !this.state.menu
    this.setState({ menu })
  }
  removeFromCart = productId => {
    this.props.removeFromCart(productId)
  }
  render() {
    const { data } = this.props
    const badge = data || []
    const subTotal = {
      value: data
        .map(item => item.price.value)
        .reduce((prev, cur) => prev + cur, 0),
      installments: 10,
      installmentValue() {
        return this.value / this.installments
      }
    }
    return (
      <header className="bg-yellow header">
        <div className="container">
          <nav className="navbar navbar-light bg-yellow justify-content-between">
            <a className="navbar-brand">
              <img alt="Buscapé logo" srcSet={logosvg} src={logo} />
            </a>
            <button type="button" className="btn" onClick={this.toggleMenu}>
              <span dangerouslySetInnerHTML={menuIcon()} />
              <span
                className={`badge badge-pill badge-danger${badge.length > 0
                  ? ' visible'
                  : ' invisible'}`}
              >
                {badge.length}
              </span>
            </button>
          </nav>
        </div>
        <div
          className={`container cart-wrapper${this.state.menu &&
          subTotal.value > 0
            ? ''
            : ' invisible'}`}
        >
          <div className="cart">
            <ul className="list-unstyled">
              {data.length > 0 &&
                data.map((product, i) => {
                  return (
                    <li className="media cart-item" key={i}>
                      <div className="cart-image">
                        <img
                          className="d-flex mr-3 img-fluid"
                          src={product.src}
                          alt=""
                        />
                      </div>
                      <div className="media-body">
                        <h5 className="mt-0 mb-1 cart-name">{product.name}</h5>
                        <span className="price installments">
                          {product.price.installments}x
                        </span>
                        <span className="price currency"> R$ </span>
                        <span className="price installment">
                          {new Intl.NumberFormat('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }).format(product.price.installmentValue)}
                        </span>
                        <div>
                          ou <span className="price">R$ </span>
                          <span className="price value">
                            {new Intl.NumberFormat('pt-BR', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            }).format(product.price.value)}
                          </span>{' '}
                          à vista
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn font-weight-bold"
                        onClick={() => this.removeFromCart(product.id)}
                      >
                        X
                      </button>
                    </li>
                  )
                })}
            </ul>
            <div className="cart-subtotal text-right">
              <div className="title">subtotal</div>
              <div>
                <span className="price installments">
                  {subTotal.installments}x
                </span>
                <span className="price currency"> R$ </span>
                <span className="price installment">
                  {new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }).format(subTotal.installmentValue())}
                </span>
                <div>
                  ou <span className="price">R$ </span>
                  <span className="price value">
                    {new Intl.NumberFormat('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(subTotal.value)}
                  </span>{' '}
                  à vista
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

function menuIcon() {
  return {
    __html:
      '<svg xmlns="http://www.w3.org/2000/svg" style="width:0;height:0;visibility:hidden;"><symbol viewBox="0 0 12 16" id="three-bars"><path fill-rule="evenodd" d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"/></symbol></svg><svg version="1.1" width="24" height="32" viewBox="0 0 12 16" class="octicon octicon-three-bars" aria-hidden="true"><use xlink:href="#three-bars"></use></svg>'
  }
}

export default Header
