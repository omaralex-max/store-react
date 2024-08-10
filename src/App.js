// src/App.jsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/NAVBAR/home-page/home';
import AboutPage from './components/register/register';
import LoginPage from './components/login/login';
import CartPage from './components/cart/Cart';
import NavBar from './components/NAVBAR/nav';
import ProductPage from './components/singlePageProduct/singlePageProduct';
import NotFoundPage from './components/undfined/NotFoundPage';
import { Provider } from 'react-redux';
import store from './components/store';
import { ThemeProvider } from './contexts/ThemeContext'; // Import ThemeProvider

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider> {/* Wrap with ThemeProvider */}
        <Router>
          <div>
            <NavBar />
            <Routes>
              <Route path='/singlePageProduct/:id' element={<ProductPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
