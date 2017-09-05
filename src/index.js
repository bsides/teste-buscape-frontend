import React from 'react'
import ReactDOM from 'react-dom'

import Buscape from './Buscape'

import './styles/index.scss'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Buscape />, document.getElementById('root'))
registerServiceWorker()
