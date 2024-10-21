import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../componentsGeneral/navbar';
import ItemPage from '../pages/item';
import ShoppingCart from '../pages/cart';
import Receipt from '../pages/receipt';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/item.tsx" element={<ItemPage />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/receipt" element={<Receipt />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;