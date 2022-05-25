import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

// 全局样式
import 'assets/style/common.scss'
// 路由
import Routes from './Routes'
// store
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes />
      </HashRouter>
    </Provider>
  </React.StrictMode>
)
