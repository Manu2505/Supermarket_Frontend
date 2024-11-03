import React, { useState } from 'react';
import { getReceiptData } from './shopping_cart/CartData';

const Receipt: React.FC = () => {
    const cashier = "Bob Ross"; // Festgelegter Cashier-Name
    const [isReceiptSent, setIsReceiptSent] = useState<boolean>(false); // Neuer State für den Status
    const receiptData = getReceiptData();

    // Gesamtsumme inklusive Steuern berechnen
    const total = receiptData.reduce((acc, item) => {
        const quantity = item.amount || 1;
        const taxAmount = item.price * (item.taxRate || 0) / 100 * quantity;
        return acc + item.price * quantity + taxAmount;
    }, 0);

    const currentDate = new Date();
    const date = currentDate.toISOString().split('T')[0];
    const time = currentDate.toTimeString().split(' ')[0];

    const sendReceiptToBackend = async () => {
        const itemPositions = receiptData.map((item) => ({
            item: {
                id: item.id,
                name: item.name,
                price: item.price,
                category: item.category,
                taxRate: item.taxRate,
                reduced: item.reduced,
            },
            amount: item.amount || 1,
        }));
        
        const totalPrice = total; // Berechnung der Gesamtsumme kann direkt verwendet werden.

        const receiptPayload = {
            date,
            time,
            cashier,
            itemList: {
                itemPositions,
                totalPrice,
            }
        };

        console.log("Sending Receipt Payload:", JSON.stringify(receiptPayload, null, 2));
    
        try {
            const response = await fetch('http://localhost:8080/receipt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(receiptPayload),
            });
    
            if (response.ok) {
                console.log('Receipt data sent successfully!');
                setIsReceiptSent(true); // Setzen des Status nach erfolgreichem Senden
            } else {
                console.error('Failed to send receipt data', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSendReceipt = () => {
        if (receiptData.length > 0 && !isReceiptSent) {
            sendReceiptToBackend();
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center' }}>Receipt</h1>
            <p style={{ textAlign: 'center' }}>Thank you for your purchase!</p>
            <p style={{ textAlign: 'center' }}><strong>Cashier:</strong> {cashier}</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '10px' }}>Name</th>
                        <th style={{ textAlign: 'center', borderBottom: '2px solid #ccc', padding: '10px' }}>Quantity</th>
                        <th style={{ textAlign: 'center', borderBottom: '2px solid #ccc', padding: '10px' }}>Net Price (€)</th>
                        <th style={{ textAlign: 'center', borderBottom: '2px solid #ccc', padding: '10px' }}>Taxes (€)</th>
                        <th style={{ textAlign: 'right', borderBottom: '2px solid #ccc', padding: '10px' }}>Total (€)</th>
                    </tr>
                </thead>
                <tbody>
                    {receiptData.map((item, index) => {
                        const quantity = item.amount || 1;
                        const netPrice = item.price * quantity; // Gesamtbetrag für die Menge
                        const taxAmount = item.price * (item.taxRate || 0) / 100 * quantity; // Steuerbetrag basierend auf der Menge
                        const totalWithTax = netPrice + taxAmount; // Gesamtbetrag inkl. Steuern

                        return (
                            <tr key={index}>
                                <td style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>{item.name}</td>
                                <td style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>{quantity}</td>
                                <td style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {quantity} x {item.price.toFixed(2)}€ = {netPrice.toFixed(2)}€
                                </td>
                                <td style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {quantity} x {((item.price * (item.taxRate || 0)) / 100).toFixed(2)}€ = {taxAmount.toFixed(2)}€
                                </td>
                                <td style={{ textAlign: 'right', padding: '10px', borderBottom: '1px solid #ddd' }}>{totalWithTax.toFixed(2)}€</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan={4} style={{ textAlign: 'right', padding: '10px', fontWeight: 'bold', borderTop: '2px solid #ccc' }}>
                            Total:
                        </td>
                        <td style={{ textAlign: 'right', padding: '10px', fontWeight: 'bold', borderTop: '2px solid #ccc' }}>
                            {total.toFixed(2)}€
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                    onClick={handleSendReceipt}
                    disabled={isReceiptSent}
                    style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
                >
                    {isReceiptSent ? 'Receipt Sent!' : 'Send Receipt'}
                </button>
            </div>
        </div>
    );
}

export default Receipt;
