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

        // Wenn die Menge 1 ist und der Benutzer auf den Minus-Button klickt, zeige eine Warnung an
        if (number < 1) {
            alert("The amount can not be equal to 0. Please use the *remove* button instead.");
            return; // Stoppe die Funktion, damit die Menge nicht aktualisiert wird
        }

        // Setze die Menge auf den neuen Wert, der mindestens 1 sein muss
        const newAmount = Math.max(number, 1);
        setAmount(newAmount);
        updateAmount(newAmount); // Menge aktualisieren
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
            <div className="number-changer-container">
                {/* Minus-Button immer anzeigen */}
                <button onClick={() => changeNumber(amount - 1)}>-</button>
                <span>{amount}</span> {/* Zeige die aktuelle Anzahl an */}
                <button onClick={() => changeNumber(amount + 1)}>+</button>
            </div>
        </div>
    );
}

export default ItemRow;
