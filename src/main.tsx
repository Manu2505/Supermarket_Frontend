import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import ShoppingCart from './pages/shopping_cart/ShoppingCart';
import Receipt from './pages/receipt';
import ItemPage from './pages/item';
import PrintItemLabelPage from './pages/printItemLabel';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
        <Routes>
          <Route path="/item" element={<ItemPage />} />
          <Route path="/printItemLabel" element={<PrintItemLabelPage />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/receipt" element={<Receipt />} />
        </Routes>
    </Router>
  </StrictMode>,
);
