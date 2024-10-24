import React from "react";
import getItemFromList from "./itemList";


const PaymentOptions: React.FC = () => {


    function getReceipt() {

        const receiptData = getItemFromList();
        

        fetch(`http://localhost:8080/receipt`,
            {
                mode: "no-cors",
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
            }
        )
    }




    return (
        <div>
            <button onClick={getReceipt}>Get your Receipt</button>
        </div>
    );
};

export default PaymentOptions;