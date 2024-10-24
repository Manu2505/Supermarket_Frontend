import React from 'react';
import OptionsMenu from '../componentsCart/options';
import ItemDisplay from '../componentsCart/itemDisplay';
import PaymentOptions from '../componentsCart/paymentOption';
import PriceLabel from '../componentsCart/priceLabel';
import './cart.css';

const ShoppingCart: React.FC = () => {

    function getItemList(): any[] {
        const receiptData = sendItemList();
    }

interface retriveItemList {
    getItemList: () => any[];
}

    return (
        <div className='cartGrid'>
            <OptionsMenu />
            <ItemDisplay />
            <PaymentOptions getItemList={getItemList} />
            <PriceLabel />
        </div>
        
    );
};

export default ShoppingCart;