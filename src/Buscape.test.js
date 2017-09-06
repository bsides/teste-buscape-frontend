import React from 'react'
import ReactDOM from 'react-dom'
import Buscape from './Buscape'
import asyncFetch from './helpers/helpers'
import helpers from './helpers/helpers'
import fetchMock from 'fetch-mock'

const localStorageMock = (function() {
  let store = {}

  return {
    getItem: function(key) {
      return store[key] || null
    },
    setItem: function(key, value) {
      store[key] = value.toString()
    },
    clear: function() {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Simply put, this should render our view
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Buscape />, div)
})

// Please notice async/await from here on
it('can fetch data.json', async () => {
  // Anything fetching data will receive this
  fetchMock.get('data.json', { items: [] })

  const response = await asyncFetch('data.json')
  const result = await response.json()

  expect(result).toHaveProperty('items')
})
