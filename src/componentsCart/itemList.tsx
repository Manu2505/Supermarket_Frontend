import React from "react";

interface ItemListProps {
  items: any[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  function removeItem(index: number) {
    items.splice(index, 1);
  }

  function quantityLowered() {
    const quantity = document.getElementById("quantity") as HTMLInputElement;
    if (parseInt(quantity.value) <= 1) {
      quantity.value = "1"; //make the Button grayed out, TODO
    } else {
      quantity.value = (parseInt(quantity.value) - 1).toString();
    }
  }

  function quantityIncreased() {
    const quantity = document.getElementById("quantity") as HTMLInputElement;
    quantity.value = (parseInt(quantity.value) + 1).toString();
  }
 // TODO: Add full Price of the items if quantity is greater than 1
  return (
    <div>
      <ol> 
        {items.map((item, index) => (
          <li key={index}>
            <button onClick={() => removeItem(index)}>Remove</button>
            {item.name} {item.price}
            <button onClick={() => quantityLowered()}>-</button>
            <input id="quantity" type="number" defaultValue={"1"}></input>
            <button onClick={() => quantityIncreased()}>+</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ItemList;
