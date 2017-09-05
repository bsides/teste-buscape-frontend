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
    selected: {}
  }
  sendToCart = e => {
    e.preventDefault()
    this.props.addToCart(this.props.product)
  }
  selectImage = e => {
    e.preventDefault()
    const selected = {
      src: e.target.src,
      alt: e.target.alt
    }
    this.setState({ selected })
  }
  render() {
    const { images, name, price, id } = this.props.product
    return (
      <form onSubmit={this.sendToCart}>
        <div className="row">
          <div className="col">
            {images.map((image, index) => (
              <ProductImage
                image={image}
                alt={name}
                selectImage={this.selectImage}
                key={`i${index}`}
              />
            ))}
          </div>

          <div className="col">
            <div className="image-selected">
              <img
                src={this.state.selected.src || images[0]}
                alt={this.state.selected.alt || name}
              />
            </div>
          </div>

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

ProductImage.propTypes = {
  image: string
}
function ProductImage({ image, alt, selectImage }) {
  return (
    <button className="mini" type="button" onClick={selectImage}>
      <Img className="img-fluid img-thumbnail" src={image} alt={alt} />
    </button>
  )
}

export default Product
