import React, { Component } from 'react'

import Header from './Header'
import Product from './Product'

import './styles/Buscape.css'

class Buscape extends Component {
  state = {
    items: [],
    cart: []
  }
  componentWillMount() {
    const persistCart = localStorage.getItem('testebuscapefe')
    if (!persistCart) {
      const cart = this.state.cart
      localStorage.setItem('testebuscapefe', JSON.stringify(cart))
    } else {
      const cart = JSON.parse(persistCart)
      this.setState({ cart })
    }
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
        src: item.images[0],
        quantity: 1
      })
    }

    this.setState({ cart: updatedCart })

    localStorage.setItem('testebuscapefe', JSON.stringify(updatedCart))
  }
  removeFromCart = productId => {
    let updatedCart = this.state.cart.filter(item => item.id !== productId)

    this.setState({ cart: updatedCart })

    localStorage.setItem('testebuscapefe', JSON.stringify(updatedCart))
  }
  async fetchProducts() {
    // just to be easier to locate this variable
    const url =
      'https://raw.githubusercontent.com/bsides/exercicios/master/frontend/resources/data.json'

    const response = await fetch(url)
    const result = await response.json()
    return result
  }
  render() {
    return (
      <div>
        <Header data={this.state.cart} removeFromCart={this.removeFromCart} />
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
