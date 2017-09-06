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
        <div className="row product bg-white">
          <div className="col-sm-2">
            {images.map((image, index) => (
              <ProductImage
                image={image}
                alt={name}
                selectImage={this.selectImage}
                isSelected={this.state.selected.src === image}
                key={`i${index}`}
              />
            ))}
          </div>

          <div className="col-sm-5 justify-content-center">
            <div className="image-selected">
              <img
                src={this.state.selected.src || images[0]}
                alt={this.state.selected.alt || name}
              />
            </div>
          </div>

          <div className="col-sm-5">
            <div className="title">{name}</div>
            <div className="best-offer">
              <span
                className={`badge badge-primary${Math.random() >= 0.5
                  ? ' d-none'
                  : ''}`}
              >
                Melhor preço
              </span>
            </div>
            <div className="row">
              <div className="col product-price">
                <span className="price installments">
                  {price.installments}x
                </span>
                <span className="price currency"> R$ </span>
                <span className="price installment">
                  {new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }).format(price.installmentValue)}
                </span>
                <div>
                  ou <span className="price">R$ </span>
                  <span className="price value">
                    {new Intl.NumberFormat('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(price.value)}
                  </span>{' '}
                  à vista
                </div>
              </div>
              <div className="col">
                <input type="hidden" value={id} />
                <button type="submit" className="btn btn-success">
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
function ProductImage({ image, alt, selectImage, isSelected }) {
  return (
    <button
      className={`mini img-thumbnail${isSelected ? ' highlight' : ''}`}
      type="button"
      onClick={selectImage}
    >
      <Img className="img-fluid" src={image} alt={alt} />
    </button>
  )
}

export default Product
