import React from "react";
import { useNavigate } from "react-router-dom";
import { getReceiptData } from "./CartData";

const PaymentOptions: React.FC = () => {
  const navigate = useNavigate();

  function getReceipt() {
    const receiptData = getReceiptData();
    const total = receiptData.reduce((acc, item) => acc + item.price * (item.amount || 1), 0);
    console.log("receiptData", receiptData);
    console.log("total", total);
    console.log(JSON.stringify({receiptData, total}));

    fetch(`http://localhost:8080/itemList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({receiptData, total}),
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
