import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ErrorProvider } from './components/ErrorContext.jsx'
import { LoadingProvider } from './components/LoadingContext.jsx'
import { AuthProvider } from './components/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorProvider>
        <LoadingProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LoadingProvider>
      </ErrorProvider>
    </BrowserRouter>
  </React.StrictMode>
)
