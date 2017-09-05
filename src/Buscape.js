import React, { Component } from 'react'

import Header from './Header'

import './styles/Buscape.scss'

class Buscape extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default Buscape
