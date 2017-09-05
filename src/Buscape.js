import React, { Component } from 'react'

import Header from './Header'
import Product from './Product'

import './styles/Buscape.css'

class Buscape extends Component {
  state = {
    items: [],
    cart: []
  }
  componentDidMount() {
    this.fetchProducts()
  }
  addToCart = item => {
    let found = false
    let updatedCart = this.state.cart.map(cartItem => {
      if (cartItem.name === item.name) {
        found = true
        cartItem.quantity++
        return cartItem
      } else {
        return cartItem
      }
    })

    if (!found) {
      updatedCart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
      })
    }

    this.setState({
      cart: updatedCart
    })
  }
  async fetchProducts() {
    // just to be easier to locate this variable
    const url =
      'https://raw.githubusercontent.com/bsides/exercicios/master/frontend/resources/data.json'

    const response = await fetch(url)
    const result = await response.json()
    this.setState({ ...result })
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          {this.state.items.map((item, index) => {
            return (
              <Product {...item} addToCart={this.addToCart} key={`p${index}`} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Buscape
