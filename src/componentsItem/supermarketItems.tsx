import React, { useState } from 'react';

const SupermarketItems: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [isReduced, setIsReduced] = useState<null | boolean>(null);

    const isFormValid = (): boolean => {
        return name.trim() !== '' && price.trim() !== '' && category.trim() !== '' && isReduced !== null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const product = { name, price: parseFloat(price), category, isReduced };

        fetch('http://localhost:8080/item', {
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
                setIsReduced(null);
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
                <div style={{ marginTop: '10px' }}>
                    <label>Is this a basic food item?</label>
                        <input
                            type="radio"
                            id="basic-yes"
                            name="isBasic"
                            value="true"
                            checked={isReduced === true}
                            onChange={() => setIsReduced(true)}
                        />
                        <label htmlFor="basic-yes">Yes</label>
                        <input
                            type="radio"
                            id="basic-no"
                            name="isBasic"
                            value="false"
                            checked={isReduced === false}
                            onChange={() => setIsReduced(false)}
                        />
                        <label htmlFor="basic-no">No</label>
                </div>
                <button type="submit" disabled={!isFormValid()} style={{ marginTop: '20px' }}>
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default SupermarketItems;
