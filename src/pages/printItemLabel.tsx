import React, { useState } from 'react';

const PrintItemLabelPage: React.FC = () => {

    const [itemId, setItemId] = useState<string>("");

  function getItemById() {
    if (!itemId) {
      alert("Please enter an item ID.");
      return;
    }

    printLabel(itemId);
  }

  function printLabel(Id: string) {
    fetch(`http://localhost:8080/item/printLabel/${Id}`, {
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
        alert("Label printed successfully"); // Benachrichtige den Benutzer über den Erfolg
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
      <button onClick={getItemById}>Print Label</button>
    </div>
  );
};

export default PrintItemLabelPage;