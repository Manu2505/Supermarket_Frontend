import { useState } from "react";

const min_num = 1
const max_num = 100

function NumberChanger(props:any) {

    const {changeNumber, number} = props

    const [value, setValue] = useState(number)

    function quantityLowered() {
        if(value === min_num){
            return
        }
        setValue(value - 1)
        changeNumber(value -1)
      }
    
      function quantityIncreased() {
        if(value === max_num){
            return
        }
        setValue(value + 1)
        changeNumber(value + 1)
      }

      console.log(value)
    return (
        <div className="counter-container">
            <button onClick={() => quantityLowered()}>-</button>
            <input type="number" defaultValue={"1"} value={value}></input>
            <button onClick={() => quantityIncreased()}>+</button>
        </div>

    )
}

export default NumberChanger