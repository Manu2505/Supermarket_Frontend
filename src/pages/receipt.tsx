import React from 'react';
import { getReceiptData } from './shopping_cart/CartData';



const Receipt: React.FC = () => {

    const receiptData = getReceiptData();

    const total = receiptData.reduce((acc, item) => acc + item.price * item.amount, 0);

    return (
        <div>
            <h1>Receipt</h1>
            <p>Here is your receipt.</p>
            
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {receiptData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.price.toFixed(2)}</td>
                            <td>{item.amount}</td>
                            <td>{(item.price * item.amount).toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={3}>Total</td>
                        <td>{total.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Receipt;