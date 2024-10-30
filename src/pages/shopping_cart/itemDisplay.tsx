import React from "react";
import InputItem from "./inputItem";
import ItemList from "./itemList";
import { getCartData } from "./CartData";

const ItemDisplay: React.FC = () => {
  const [items, setItems] = React.useState<any[]>(getCartData());

  function addItemToList(data: any) {
    console.log("data", data);
    // Füge das Item zur Liste hinzu, wenn die Menge aktualisiert wurde
    setItems([...items]); // Update der Item-Liste
  }

  return (
    <div>
      <h1>Item List</h1>
      <InputItem addItemToList={addItemToList} />
      <ItemList items={items} />
    </div>
  );
};

export default ItemDisplay;
