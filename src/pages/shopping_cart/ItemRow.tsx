import React, { useEffect, useState } from "react";

interface ItemRowProps {
  item: any;
  removeItem: () => void;
  updateAmount: (newAmount: number) => void;
}

function ItemRow(props: ItemRowProps) {
  const { removeItem, item, updateAmount } = props;

  const [amount, setAmount] = useState(item.amount || 1);

  useEffect(() => {
    setAmount(item.amount || 1);
  }, [item.amount]);

  function changeNumber(number: number) {
    if (number < 1) {
      alert("The amount can not be equal to 0. Please use the *remove* button instead.");
      return;
    }

    const newAmount = Math.max(number, 1);
    setAmount(newAmount);
    updateAmount(newAmount);
  }

  function getTotalPriceWithTax() {
    const priceWithTax = item.price * (1 + (item.taxRate || 0) / 100);
    return (priceWithTax * amount).toFixed(2);
  }

  function getFullPriceWithoutTax() {
    return item.price ? (item.price * amount).toFixed(2) : "-";
  }

  return (
    <div className="row-container">
      <button onClick={removeItem}>Remove</button>
      <div className="text-container">
        <div>
          <strong>Name:</strong> {item.name}
        </div>
        <div>
          <strong>Category:</strong> {item.category}
        </div>
        <div>
          <strong>Price per Unit:</strong> ${item.price.toFixed(2)}
        </div>
        <div>
          <strong>Tax Rate:</strong> {item.taxRate}% 
        </div>
        <div>
          <strong>Total Price (without tax):</strong> ${getFullPriceWithoutTax()}
        </div>
        <div>
          <strong>Total Price (with tax):</strong> ${getTotalPriceWithTax()}
        </div>
      </div>
      <div className="number-changer-container">
        <button onClick={() => changeNumber(amount - 1)}>-</button>
        <span>{amount}</span>
        <button onClick={() => changeNumber(amount + 1)}>+</button>
      </div>
    </div>
  );
}

export default ItemRow;
