import React, { useEffect, useState } from 'react';
import { getReceiptData } from './shopping_cart/CartData';

const Receipt: React.FC = () => {
    const [cashier, setCashier] = useState<string>('');
    const receiptData = getReceiptData();

    // Gesamtsumme inklusive Steuern berechnen
    const total = receiptData.reduce((acc, item) => {
        const quantity = item.amount || 1;
        const taxAmount = item.price * (item.taxRate || 0) / 100 * quantity;
        const totalWithTax = item.price * quantity + taxAmount;
        return acc + totalWithTax;
    }, 0);

    const currentDate = new Date();
    const date = currentDate.toISOString().split('T')[0];
    const time = currentDate.toTimeString().split(' ')[0];

    useEffect(() => {
        const fetchCashiers = async () => {
            try {
                const response = await fetch('/cashiers.json');
                if (!response.ok) throw new Error('Failed to load cashiers data');
                const cashiers = await response.json();

                const randomCashier = cashiers[Math.floor(Math.random() * cashiers.length)];
                setCashier(randomCashier.name);
            } catch (error) {
                console.error('Error loading cashiers:', error);
            }
        };

        fetchCashiers();
    }, []);

    const sendReceiptToBackend = async () => {
        // Umwandlung der receiptData in das richtige Format für die ItemList
        const items = receiptData.map(item => {
            const quantity = item.amount || 1; // Anzahl des Artikels
            const price = item.price; // Preis pro Artikel
            const taxRate = item.taxRate || 0; // Steuer in Prozent
    
            return {
                name: item.name,
                quantity: quantity,
                price: price,
                taxRate: taxRate,
            };
        });
    
        const receiptPayload = {
            date,
            time,
            cashier,
            itemList: {
                items: items // Hier Items zur ItemList hinzufügen
            }
        };
    
        // Debug: Ausgabe der JSON, die gesendet wird
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
            } else {
                console.error('Failed to send receipt data', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    // Send receipt data when cashier and receiptdata is available
    useEffect(() => {
        if (cashier && receiptData.length > 0) {
            sendReceiptToBackend();
        }
    }, [cashier, receiptData]);
    

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
        </div>
    );
}

export default Receipt;
