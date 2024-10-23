import React from 'react';
import OptionsMenu from '../componentsCart/options';
import ItemList from '../componentsCart/itemList';
import PaymentOptions from '../componentsCart/paymentOption';
import PriceLabel from '../componentsCart/priceLabel';
import './cart.css';

const ShoppingCart: React.FC = () => {
    return (
        <div className='cartGrid'>
            <OptionsMenu />
            <ItemList />
            <PaymentOptions />
            <PriceLabel />
        </div>
        
    );
};

export default ShoppingCart;