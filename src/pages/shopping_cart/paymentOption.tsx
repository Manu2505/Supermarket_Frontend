import React from "react";
import { useNavigate } from "react-router-dom";
import { getReceiptData } from "./CartData";

const PaymentOptions: React.FC = () => {
  const navigate = useNavigate();

  function getReceipt() {
    const receiptData = getReceiptData();

    // Digestable for Backend
    const itemPositions = receiptData.map((item) => 
    ({
      item: {
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        taxRate: item.taxRate,
        basic: item.basic,
      },
      amount: item.amount || 1,
    }));

    const totalPrice = receiptData.reduce((acc, item) => acc + item.price * (item.amount || 1), 0);

    
      
      console.log("receiptData", receiptData);
      console.log("itemPositions", itemPositions);
      console.log("total", totalPrice);
      console.log(JSON.stringify({itemPositions, totalPrice}));

    fetch(`http://localhost:8080/itemList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({itemPositions, totalPrice}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Weiterleitung zur /receipt-Seite und Übergabe der Daten im state
        navigate("/receipt", { state: { receiptData: data } });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <button onClick={getReceipt}>Pay with card</button>
      <button onClick={getReceipt}>Pay with cash</button>
    </div>
  );
};

export default PaymentOptions;
