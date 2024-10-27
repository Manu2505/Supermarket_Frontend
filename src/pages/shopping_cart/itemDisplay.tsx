import React from "react";
import InputItem from "./inputItem";
import ItemList from "./itemList";
import { getCartData } from "../../api/CartData";



const ItemDisplay: React.FC = () => {
    const [items, setItems] = React.useState<any[]>(getCartData());

    function addItemToList(data: any) {
        console.log("data", data);
        const newItems = [...items];
        newItems.push(data);
        setItems(newItems);
        console.log("items", newItems);
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