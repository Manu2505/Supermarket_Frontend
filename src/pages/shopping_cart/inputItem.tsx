import React from "react";

interface InputItemProps {
  addItemToList: (item: any) => void;
}

const InputItem: React.FC<InputItemProps> = ({ addItemToList }) => {
  function getItemById() {
    try {
      const inputElement = document.getElementById("input");
      if (!inputElement) {
        throw new Error("Input element not found");
      }
      const input = (inputElement as HTMLInputElement).value;
      if (input === "") {
        alert("Please enter an item ID.");
        throw new Error("Please enter an item ID.");
      } else {
        console.log(input);
        addItemsToCart(input);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function addItemsToCart(Id: String) {
    fetch(`http://localhost:8080/items/${Id}`, {
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
      <input type="text" id="input"></input>
      <button onClick={() => getItemById()}>Add Item</button>
    </div>
  );
};

export default InputItem;
