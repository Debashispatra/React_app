import { useState } from "react";


function Demo() {
    const [name, setName] = useState("");

    function handleChange(e) {
        setName(e.target.value )
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name == "") {
            alert("Please enter your name")
        } else {
            alert(name)
        }
    }

    function removeData(e) {
        e.preventDefault();
        setName("");    
    }
    return (
        <div>
            <h3>React form</h3>
        <form onSubmit={handleSubmit}>
            <label>Enter your name:
                <input style= {{marginLeft:"10px"}} type="text" value={name} onChange={handleChange} />
                <button style= {{marginLeft:"10px"}} type="submit">Submit</button>
                <button style= {{marginLeft:"10px"}} onClick={removeData}>Reset</button>
            </label>
        </form>
        </div>
    )
}

export default Demo;