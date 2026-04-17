import { useState } from "react"

function MultiInput() {

    const [inputs, setInputs] = useState({
        firstname : "",
        lastname : "",
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((prev) => ({ ...prev, [name]: value }));
    }


    return (
        <form>
            <label>
                First Name: <input type="text" name="firstname" value={inputs.firstname} onChange={handleChange} />
            </label>
            <label>
                Last Name: <input type="text" name="lastname" value={inputs.lastname} onChange={handleChange} />
            </label>
            <p>Current Value: {inputs.firstname} {inputs.lastname}</p>
        </form>
    )
}

export default MultiInput;