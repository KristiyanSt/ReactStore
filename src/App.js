import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navigation.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Home from './components/Home.js';
import Create from './components/Create.js';
import Details from './components/Details.js';
import ProductsProvider from './contexts/ProductsCtx.js';
import Edit from './components/Edit.js';
import Cart from './components/Cart.js';
import Profile from './components/Profile.js';


function App() {

  return (
    <div className="App">
      <AuthProvider >
        <ProductsProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<Create />} />
            <Route path="/products/details/:id" element={<Details />} />
            <Route path="/products/edit/:id" element={<Edit />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </ProductsProvider>
      </AuthProvider>
    </div >
  );
}

export default App;
