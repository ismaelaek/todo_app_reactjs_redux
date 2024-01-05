import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Signup from './components/Signup';
import store from './features/store';
import About from './components/About';
import './App.css'

const NavBarContainer = () => {
  const location = useLocation();
  if(location.pathname === '/' || location.pathname === '/about')
    return <NavBar /> ;
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBarContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
