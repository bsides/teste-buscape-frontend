import React, { Component } from 'react'

class Products extends Component {
  render() {
    const { data } = this.props
    return (
      <div className="container">
        <div className="row">
          {data.map(({ product }, index) => {
            return (
              <div className="col" key={`p${index}`}>
                {product.name}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Products
