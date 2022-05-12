import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AliveScope } from 'react-activation'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// root.render(
//   <React.StrictMode>
//     <HashRouter>
//       <App />
//     </HashRouter>
//   </React.StrictMode>,
// )

root.render(
  <AliveScope>
    <HashRouter>
      <App />
    </HashRouter>
  </AliveScope>,
)

// reportWebVitals();
reportWebVitals(console.log)
