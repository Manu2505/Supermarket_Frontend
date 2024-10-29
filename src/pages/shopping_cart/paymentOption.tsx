import React from "react";
import { getReceiptData } from "./CartData";



const PaymentOptions: React.FC = () => {
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      window.location.href = "/receipt";
  }

  return (
    <div>
      <button onClick={getReceipt}>Get your Receipt</button>
    </div>
  );
};

export default PaymentOptions;