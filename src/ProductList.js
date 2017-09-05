import React, { Component } from 'react'
import { array, func } from 'prop-types'
import Product from './Product'

class ProductList extends Component {
  static propTypes = {
    data: array,
    handleCart: func
  }
  render() {
    const { data, handleCart } = this.props
    return (
      <div className="container">
        {data.map(({ product }, index) => {
          return (
            <Product {...product} handleCart={handleCart} key={`p${index}`} />
          )
        })}
      </div>
    )
  }
}

export default ProductList
