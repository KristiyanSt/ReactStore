import { AuthProvider } from './contexts/AuthContext.js'

import 'bootstrap/dist/css/bootstrap.min.css'

import Navigation from './components/Navigation/Navigation.js'
import ProductsProvider from './contexts/ProductsCtx.js'
import ShoppingCartProvider from './contexts/ShoppingCartContext.js'
import RoutesWrapper from './routes/RoutesWrapper.js'

import AlertProvider from './contexts/AlertContext.js'
import Alert from './components/Alert/Alert.js'
import { Spinner } from 'react-bootstrap'
import ErrorBoundary from './components/ErrorBoundary.js'
import ShoppingCart from './components/ShoppingCart/ShoppingCart.js'

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallback={<div>Error</div>}>
        <AlertProvider>
          <AuthProvider >
            <ProductsProvider>
              <ShoppingCartProvider>
                <Navigation />
                <ShoppingCart />
                <RoutesWrapper />
                <Alert />
                {/* <div>
                  <Spinner animation="border" />
                  <p>Loading</p>
                </div> */}
              </ShoppingCartProvider>
            </ProductsProvider>
          </AuthProvider>
        </AlertProvider>
      </ErrorBoundary>
    </div >
  );
}

export default App;
