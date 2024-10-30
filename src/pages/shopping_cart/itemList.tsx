import React, { useState } from "react";
import ItemRow from "./ItemRow";

interface ItemListProps {
  items: any[];
}

export let receiptData: any[] = [];

const ItemList: React.FC<ItemListProps> = ({ items: initialItems }) => {
  const [items, setItems] = useState(initialItems);

  receiptData = items; // Die aktuelle Liste wird an `receiptData` weitergegeben

  function removeItem(index: number) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }

  function updateItemAmount(index: number, newAmount: number) {
    const updatedItems = items.map((item, idx) =>
      idx === index ? { ...item, amount: newAmount } : item
    );
    setItems(updatedItems);
  }

  return (
    <div>
      {items.map((item, index) => (
        <ItemRow
          key={index}
          item={item}
          removeItem={() => removeItem(index)}
          updateAmount={(newAmount) => updateItemAmount(index, newAmount)}
        />
      ))}
    </div>
  );
};

export default ItemList;
