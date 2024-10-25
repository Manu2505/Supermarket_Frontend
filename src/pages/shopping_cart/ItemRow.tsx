import { useEffect, useState } from "react";
import NumberChanger from "../../components/NumberChanger";

function ItemRow(props: any) {

    const { removeItem, item } = props

    const [amount, setAmount] = useState(1)

    useEffect(() => {
        if (item.amount) {
            setAmount(item.amount)
        }
    }, [])
    function changeNumber(number: any) {
        setAmount(number)
    }

    function getFullPrice() {
        if (item.price) {
            return Math.floor(item.price * amount * 100) / 100
        }
        return -1
    }

    return (
        <div className="row-container">
            <button onClick={() => removeItem()}>Remove</button>
            <div className="text-container">
                {item.name} {item.price} {getFullPrice()}
            </div>
            <NumberChanger number={1} changeNumber={(n: any) => changeNumber(n)} />
        </div>
    )
}
export default ItemRow

/*
        {items.map((item, index) => (
          <li key={index}>
            <button onClick={() => removeItem(index)}>Remove</button>
            {item.name} {item.price} {fullPrices[index]}
            <button onClick={() => quantityLowered(index)}>-</button>
            <input id={index.toString()} type="number" defaultValue={"1"}></input>
            <button onClick={() => quantityIncreased(index)}>+</button>
          </li>
        ))}

*/