import { useEffect, useState } from "react";
import NumberChanger from "../../components/NumberChanger";

interface ItemRowProps {
    item: any;
    removeItem: () => void;
    updateAmount: (newAmount: number) => void; // neue Funktion zum Aktualisieren der Menge
}

function ItemRow(props: ItemRowProps) {
    const { removeItem, item, updateAmount } = props;

    const [amount, setAmount] = useState(item.amount || 1);

    useEffect(() => {
        setAmount(item.amount || 1);
    }, [item.amount]);

    function changeNumber(number: number) {
        setAmount(number);
        updateAmount(number); // Menge aktualisieren
    }

    function getFullPrice() {
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
                    <strong>Total Price:</strong> ${getFullPrice()}
                </div>
            </div>
            <NumberChanger number={amount} changeNumber={changeNumber} />
        </div>
    );
}

export default ItemRow;
