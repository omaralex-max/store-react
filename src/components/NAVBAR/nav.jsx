// src/components/NAVBAR/nav.jsx
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './nav.css';
import { useSelector } from 'react-redux';
import { useTheme } from '../../contexts/ThemeContext'; // Import useTheme

function NavBar() {
  const { isDarkMode, toggleTheme } = useTheme(); // Use theme context

  const cart = useSelector((state) => state.cart);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar className='navbar' bg={isDarkMode ? "dark" : "light"} variant={isDarkMode ? "dark" : "light"}>
      <Navbar.Brand className='brand' as={Link} to="/">Alex-Store</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link onClick={toggleTheme}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Nav.Link>
        <Nav.Link className='navlink' as={Link} to="/about">Register</Nav.Link>
        <Nav.Link className='navlink' as={Link} to="/login">Log-In</Nav.Link>
        <Nav.Link className='navlink' as={Link} to="/cart">
          {totalQuantity > 0 && (
            <div className="cart-quantity">{totalQuantity}</div>
          )}
          <FontAwesomeIcon className='carticon' icon={faCartShopping} />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
