import React, { useState } from "react";
import ItemRow from "./ItemRow";

interface ItemListProps {
  items: any[];
}

export let receiptData: any[] = [];

const ItemList: React.FC<ItemListProps> = ({ items: initialItems }) => {

  const [items, setItems] = useState(initialItems);
  receiptData = items;

  function removeItem(index: number) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    console.log("items", newItems);
  }

  return (
    <div>
      {items.map((item, index) => (
        <ItemRow key={index} item={item} removeItem={() => removeItem(index)} />
      ))}
    </div>
  );
};

export default ItemList;