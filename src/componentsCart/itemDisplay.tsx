import React from "react";
import InputItem from "./inputItem";
import ItemList from "./itemList";

const ItemDisplay: React.FC = () => {

    function addItemToList(data: any) {
        console.log("data", data);
        items.push(data);
    }

    const items: any = [{ name: "Item 1" }, { name: "Item 2" }];

    return (
        <div>
            <h1>Item List</h1>
            <InputItem addItemToList={addItemToList} />
            <ItemList items={items} />
        </div>
    );
};

export default ItemDisplay;