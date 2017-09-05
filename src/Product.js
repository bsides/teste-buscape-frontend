import React, { Component } from 'react'
import Img from 'react-image'
import { array, string, objectOf, number, func, shape } from 'prop-types'

class Product extends Component {
  static propTypes = {
    product: shape({
      images: array,
      name: string,
      price: objectOf(number),
      id: number,
      handleCart: func
    })
  }
  state = {
    selected: ''
  }
  sendToCart = e => {
    e.preventDefault()
    this.props.addToCart(this.props.product)
  }
  render() {
    const { images, name, price, id } = this.props.product
    return (
      <form onSubmit={this.sendToCart}>
        <div className="row">
          <div className="col">
            {images.map((image, index) => {
              return <ProductImage image={image} alt={name} key={`i${index}`} />
            })}
          </div>
          {this.state.selected && (
            <div className="col">
              <div className="image-selected">
                <img src={this.state.selected} />
              </div>
            </div>
          )}
          <div className="col">
            <div className="title">{name}</div>
            <div className="best-offer">Melhor preço</div>
            <div className="row">
              <div className="col">
                <span className="price installments">
                  {price.installments}x
                </span>
                <span className="price currency"> R$ </span>
                <span className="prince installment">
                  {price.installmentValue}
                </span>
                <div>
                  ou <span>R$ </span>
                  <span>{price.value}</span> à vista
                </div>
              </div>
              <div className="col">
                <input type="hidden" value={id} />
                <button type="submit" className="btn">
                  Adicionar ao carrinho >
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

const ProductImage = ({ image }) => {
  return (
    <div className="mini">
      <Img className="img-fluid img-thumbnail" src={image} alt="Miniatura" />
    </div>
  )
}

export default Product
