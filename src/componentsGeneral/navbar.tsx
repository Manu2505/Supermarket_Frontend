import React from 'react';
import { Link } from 'react-router-dom';
//import './navbar.css'; // Assuming you have some CSS for styling

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/store-items">Store Items</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/shopping-cart">Shopping Cart</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/receipt">Receipt</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;