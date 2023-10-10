import { Routes, Route, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
import { AuthContext, AuthProvider } from './contexts/AuthContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navigation.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Home from './components/Home.js';
import Create from './components/Create.js';
import Details from './components/Details.js';

// import { request } from './request.js';

function App() {
  // const [user, setUser] = useState({});
  // const navigate = useNavigate();

  // async function onLogin(values) {
  //   const result = await request('users/login', values, 'post');
  //   setUser(result);
  //   navigate('/');
  // }

  // async function onRegister(values) {
  //   const result = await request('users/register', values, 'post');
  //   setUser(result);
  //   navigate('/');
  // }

  // const authContext = {
  //   user,
  //   isAuthenticated: user.accessToken ? true : false,
  //   onLogin,
  //   onRegister
  // }
  return (
    <div className="App">
      <AuthProvider >
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="/products/details/:id" element={<Details />} />
        </Routes>
      </AuthProvider>
    </div >
  );
}

export default App;
