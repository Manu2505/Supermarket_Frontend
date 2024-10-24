import React, { useState } from "react";

interface ItemListProps {
    items: any[];
}

const ItemList: React.FC<ItemListProps> = ({ items: initialItems }) => {
  const [items, setItems] = useState(initialItems);
  const [fullPrices, setFullPrices] = useState<number[]>(initialItems.map(item => parseFloat(item.price)));

  function removeItem(index: number) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    console.log("items", newItems);
  }

  function quantityLowered(index: number) {
    const quantity = document.getElementById(index.toString()) as HTMLInputElement;
    if (parseInt(quantity.value) <= 1) {
      quantity.value = "1"; //make the Button grayed out, TODO
    } else {
      quantity.value = (parseInt(quantity.value) - 1).toString();
    }
    updateFullPrice(index);
  }

  function quantityIncreased(index: number) {
    const quantity = document.getElementById(index.toString()) as HTMLInputElement;
    quantity.value = (parseInt(quantity.value) + 1).toString();
    updateFullPrice(index);
  }

  function updateFullPrice(index: number) {
    const quantity = document.getElementById(index.toString()) as HTMLInputElement;
    const price = items[index].price;
    const fullPrice = parseInt(quantity.value) * parseFloat(price);
    setFullPrice(index, fullPrice);
  }

  function setFullPrice(index: number, fullPrice: number): Promise<void> {
    return new Promise((resolve) => {
      const newFullPrices = [...fullPrices];
      newFullPrices[index] = fullPrice;
      setFullPrices(newFullPrices);
      resolve();
    });
  }

  function sendItemList(): any[] {
    const receiptData = items.map((item, index) => {
      const quantity = document.getElementById(index.toString()) as HTMLInputElement;
      return {
        name: item.name,
        price: item.price,
        quantity: quantity.value,
        fullPrice: fullPrices[index],
      };
    });
    return receiptData;
  }
  
  return (
    <div>
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            <button onClick={() => removeItem(index)}>Remove</button>
            {item.name} {item.price} {fullPrices[index]}
            <button onClick={() => quantityLowered(index)}>-</button>
            <input id={index.toString()} type="number" defaultValue={"1"}></input>
            <button onClick={() => quantityIncreased(index)}>+</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ItemList;