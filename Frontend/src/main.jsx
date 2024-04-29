import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ErrorProvider } from './components/ErrorContext.jsx'
import { LoadingProvider } from './components/LoadingContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorProvider>
        <LoadingProvider>
        <App />
        </LoadingProvider>
      </ErrorProvider> 
    </BrowserRouter>
  </React.StrictMode>
)
