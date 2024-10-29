import { useEffect, useState } from "react";
import NumberChanger from "../../components/NumberChanger";

function ItemRow(props: any) {
    const { removeItem, item } = props;

    const [amount, setAmount] = useState(1);

    useEffect(() => {
        if (item.amount) {
            setAmount(item.amount);
        }
    }, [item.amount]);

    function changeNumber(number: any) {
        setAmount(number);
    }

    function getFullPrice() {
        if (item.price) {
            return (item.price * amount).toFixed(2); // Gesamtpreis auf zwei Dezimalstellen gerundet
        }
        return -1;
    }

    return (
        <div className="row-container">
            <button onClick={removeItem}>Remove</button>
            <div className="text-container">
                {/* Reihenfolge: Name, Kategorie, Gesamtpreis */}
                <div>
                    <strong>Name:</strong> {item.name}
                </div>
                <div>
                    <strong>Category:</strong> {item.category}
                </div>
                <div>
                    <strong>Total Price:</strong> ${getFullPrice()}
                </div>
            </div>
            <NumberChanger number={amount} changeNumber={(n: any) => changeNumber(n)} />
        </div>
    );
}

export default ItemRow;
