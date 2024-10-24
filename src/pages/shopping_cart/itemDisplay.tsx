import React from "react";
import InputItem from "./inputItem";
import ItemList from "./itemList";
import { getCartData } from "../../api/CartData";

const ItemDisplay: React.FC = () => {

    function addItemToList(data: any) {
        console.log("data", data);
        items.push(data);
    }

    const items: any = getCartData()

    return (
        <div>
            <h1>Item List</h1>
            <InputItem addItemToList={addItemToList} />
            <ItemList items={items} />
        </div>
    );
};

export default ItemDisplay;