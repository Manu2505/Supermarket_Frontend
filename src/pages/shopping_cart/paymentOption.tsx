import React from "react";
import { useNavigate } from "react-router-dom";
import { getReceiptData } from "./CartData";

const PaymentOptions: React.FC = () => {
  const navigate = useNavigate();

  function getReceipt() {
    const receiptData = getReceiptData();
    console.log("receiptData", receiptData);

    fetch(`http://localhost:8080/receipt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(receiptData),
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
