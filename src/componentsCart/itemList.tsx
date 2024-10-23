import React from "react";

interface ItemListProps {
    items: any[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;