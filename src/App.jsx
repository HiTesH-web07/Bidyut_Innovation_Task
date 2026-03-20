import React from 'react';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart2 from './Components/Cart2';
import Wishlist from './Components/Wishlist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Description from './Components/Description';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Checkout from './Components/Checkout';

const App = () => {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart2 />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/description/:id' element={<Description />} />
        <Route path='/description' element={<Description />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </Router>
  );
};

export default App;
