import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { Dashboard } from './dashboard/dashboard'
import {GlobalStyle} from "./style/global";
import {StyledHeader} from "./style/components/styledHeader";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
      <GlobalStyle />
      <StyledHeader><div>Crypto-Dashboard</div></StyledHeader>
      <Dashboard />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
