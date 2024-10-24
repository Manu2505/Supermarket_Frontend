import React from "react";

interface InputItemProps {
    addItemToList: (item: any) => void;
}

const InputItem: React.FC<InputItemProps> = ({ addItemToList }) => {

  function getItemById(event: React.KeyboardEvent<HTMLInputElement>) {
    try {
      if (event.key === "Enter" && event.currentTarget.value === "") {
        alert("Please enter an item ID.");
        throw new Error("Please enter an item ID.");
      }
      if (event.key === "Enter") {
        console.log(event.currentTarget.value);
        addItemsToCart(event.currentTarget.value);
      }
      if (event.key === "Escape") {
        event.currentTarget.value = "";
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  function addItemsToCart(itemId: String) {
    fetch(`http://localhost:8080/items/${itemId}`,
        {
            mode: "no-cors",
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            addItemToList(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
  }

  return (
    <div>
      <input type="number" onKeyUp={getItemById}></input>
    </div>
  );
};

export default InputItem;
