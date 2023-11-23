import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { AuthProvider } from './contexts/AuthContext.js'
import Navigation from './components/Navigation/Navigation.js'
import ProductsProvider from './contexts/ProductsCtx.js'
import ShoppingCartProvider from './contexts/ShoppingCartContext.js'
import RoutesWrapper from './routes/RoutesWrapper.js'

import AlertProvider from './contexts/AlertContext.js'
import Alert from './components/Alert/Alert.js'
import { Spinner } from 'react-bootstrap'
import ErrorBoundary from './components/Error/ErrorBoundary.js'
import ShoppingCart from './components/ShoppingCart/ShoppingCart.js'
import Footer from './components/Footer/Footer.js'
import Error from './components/Error/Error.js';

function App() {
  return (
    <div className="App">
      <div className="page-container">
        <div className="content-wrap">
          <ErrorBoundary fallback={<Error/>}>
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
        </div>
        <Footer />
      </div>
    </div >
  );
}

export default App;
