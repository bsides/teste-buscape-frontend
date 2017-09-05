import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import fetchMock from 'fetch-mock'

// Simply put, this should render our view
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

// Please notice async/await here
it('can fetch data.json', async () => {
  // Anything fetching data will receive this
  fetchMock.get('data.json', { items: [] })

  const response = await fetch('data.json')
  const result = await response.json()

  expect(result).toHaveProperty('items')
})

it(`can handle errors in case fetch doesn't work`, async () => {})
