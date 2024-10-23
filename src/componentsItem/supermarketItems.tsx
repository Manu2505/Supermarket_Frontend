import React, { useState } from 'react';

const SupermarketItems: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const product = { name, price, category };
        console.log('Product:', product);

        fetch('http://localhost:8080/item', {
            mode: 'no-cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setName('');
                setPrice('');
                setCategory('');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h1>Add a New Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default SupermarketItems;