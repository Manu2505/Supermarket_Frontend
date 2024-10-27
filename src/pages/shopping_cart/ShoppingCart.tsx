import React from 'react';
import OptionsMenu from './options';
import ItemDisplay from './itemDisplay';
import PaymentOptions from './paymentOption';
import PriceLabel from './priceLabel';
import './cart.css';

const ShoppingCart: React.FC = () => {



    return (
        <div className='page-frame'>
            <OptionsMenu />
            <ItemDisplay />
            <PaymentOptions />
            <PriceLabel />
        </div>
        
    );
};

export default ShoppingCart;