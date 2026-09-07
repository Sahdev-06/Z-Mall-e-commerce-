import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './context/CartContext.jsx'
import AddressProvider from './context/AddressContext.jsx'
import CheckoutProvider from './context/CheckoutContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './context/AuthContext.jsx'
import ScrollToTop from './components/Common/ScrollToTop.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToTop />
    <Toaster />
    
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <CheckoutProvider>
            <AddressProvider>
              <App />
            </AddressProvider>
          </CheckoutProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>
)
