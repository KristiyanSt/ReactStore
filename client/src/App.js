import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import ErrorBoundary from './components/Error/ErrorBoundary.js'
import AlertProvider from './contexts/AlertContext.js'
import { AuthProvider } from './contexts/AuthContext.js'
import ShoppingCartProvider from './contexts/ShoppingCartContext.js'
import Navigation from './components/Navigation/Navigation.js'
import ShoppingCart from './components/ShoppingCart/ShoppingCart.js'
import Alert from './components/Alert/Alert.js'
import RoutesWrapper from './routes/RoutesWrapper.js'
import Footer from './components/Footer/Footer.js'
import Error from './components/Error/Error.js'



function App() {
  return (
    <div className="App">
      <div className="page-container">
        <div className="content-wrap">
          <ErrorBoundary fallback={<Error />}>
            <AlertProvider>
              <AuthProvider >
                <ShoppingCartProvider>
                  <Navigation />
                  <ShoppingCart />
                  <Alert />
                  <RoutesWrapper />
                </ShoppingCartProvider>
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
