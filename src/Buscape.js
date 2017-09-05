import React, { Component } from 'react'

import Header from './Header'
import Products from './Products'

import './styles/Buscape.css'

class Buscape extends Component {
  state = { items: [] }
  componentDidMount() {
    this.fetchProducts()
  }
  fetchProducts() {
    fetch(
      'https://raw.githubusercontent.com/bsides/exercicios/master/frontend/resources/data.json'
    )
      .then(response => {
        return response.json()
      })
      .then(result => {
        this.setState({ ...result })
      })
  }
  render() {
    return (
      <div>
        <Header />
        <Products data={this.state.items} />
      </div>
    )
  }
}

export default Buscape
