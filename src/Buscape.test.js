import React from 'react'
import ReactDOM from 'react-dom'
import Buscape from './Buscape'
import asyncFetch from './helpers/helpers'
import helpers from './helpers/helpers'
import fetchMock from 'fetch-mock'

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

it(`can handle errors in case fetch doesn't work`, async () => {
  // Anything >= 400
  fetchMock.get('http://bad.url', {
    status: 400,
    body: JSON.stringify('bad data')
  })

  const outcome = await helpers.syncify(async () => {
    return await asyncFetch('http://bad.url')
  })

  expect(outcome).toThrow()
})
