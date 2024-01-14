import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import reducer from './redux/reducer'
import { legacy_createStore as createStore } from 'redux'
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducer)
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router>
        <App />
      </Router>
    </BrowserRouter>
  </Provider>,
)

reportWebVitals()
