import React from "react";
import InputItem from "./inputItem";

const ItemList: React.FC = () => {

    function addItemToList(data: any) {
        console.log("data", data);
        items.push(data);
    }

    const items = [];

    return (
        <div>
            <h1>Item List</h1>
            <InputItem addItemToList={addItemToList} />
        </div>
    );
};

export default ItemList;