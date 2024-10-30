import React from 'react';
import { getReceiptData } from './shopping_cart/CartData';

const Receipt: React.FC = () => {
    const receiptData = getReceiptData();
    const total = receiptData.reduce((acc, item) => acc + item.price * (item.amount || 1), 0);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center' }}>Receipt</h1>
            <p style={{ textAlign: 'center' }}>Thank you for your purchase!</p>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '10px' }}>Name</th>
                        <th style={{ textAlign: 'center', borderBottom: '2px solid #ccc', padding: '10px' }}>Quantity</th>
                        <th style={{ textAlign: 'center', borderBottom: '2px solid #ccc', padding: '10px' }}>Price per Unit (€)</th>
                        <th style={{ textAlign: 'right', borderBottom: '2px solid #ccc', padding: '10px' }}>Total (€)</th>
                    </tr>
                </thead>
                <tbody>
                    {receiptData.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>{item.name}</td>
                            <td style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
                                {item.amount || 1}
                            </td>
                            <td style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>{item.price.toFixed(2)}€</td>
                            <td style={{ textAlign: 'right', padding: '10px', borderBottom: '1px solid #ddd' }}>
                                {(item.price * (item.amount || 1)).toFixed(2)}€
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={3} style={{ textAlign: 'right', padding: '10px', fontWeight: 'bold', borderTop: '2px solid #ccc' }}>
                            Total:
                        </td>
                        <td style={{ textAlign: 'right', padding: '10px', fontWeight: 'bold', borderTop: '2px solid #ccc' }}>
                            {total.toFixed(2)}€
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}    

export default Receipt;
