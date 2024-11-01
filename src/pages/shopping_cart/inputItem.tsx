import React, { useState } from "react";

interface InputItemProps {
  addItemToList: (item: any) => void;
}

export let cartInputData: any[] = []; // Array, um hinzugefügte Items zu speichern

const InputItem: React.FC<InputItemProps> = ({ addItemToList }) => {
  const [itemId, setItemId] = useState<string>("");

  function getItemById() {
    if (!itemId) {
      alert("Please enter an item ID.");
      return;
    }

    addItemsToCart(itemId);
  }

  function addItemsToCart(Id: string) {
    fetch(`http://localhost:8080/item/${Id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Item not found"); // Fehlerbehandlung für 404
        }
        return response.json();
      })
      .then((data) => {
        const existingItem = cartInputData.find(item => item.id === data.id);

        if (existingItem) {
          existingItem.amount += 1; // Erhöhe die Anzahl des bestehenden Items
        } else {
          data.amount = 1; // Setze die Anfangsanzahl auf 1
          cartInputData.push(data); // Speichere das Item im cartInputData
        }

        addItemToList(data); // Füge das Item zur Liste hinzu (oder aktualisiere die bestehende Menge)
        setItemId(""); // Setze die Eingabe zurück
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error.message); // Benachrichtige den Benutzer über den Fehler
      });
  }

  return (
    <div>
      <input 
        type="text" 
        id="input" 
        value={itemId} 
        onChange={(e) => setItemId(e.target.value)}
        placeholder="Enter item ID" 
      />
      <button onClick={getItemById}>Add Item</button>
    </div>
  );
};

export default InputItem;
