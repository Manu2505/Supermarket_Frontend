import React from 'react';
import OptionsMenu from './options';
import ItemDisplay from './itemDisplay';
import PaymentOptions from './paymentOption';
import PriceLabel from './priceLabel';
import './cart.css';

const ShoppingCart: React.FC = () => {

    function getItemList(): any[] {
        const receiptData = sendItemList();
    }

interface retriveItemList {
    getItemList: () => any[];
}

    return (
        <div className='page-frame'>
            <OptionsMenu />
            <ItemDisplay />
            <PaymentOptions getItemList={getItemList} />
            <PriceLabel />
        </div>
        
    );
};

export default ShoppingCart;