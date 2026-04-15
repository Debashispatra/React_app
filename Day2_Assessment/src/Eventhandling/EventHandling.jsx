import { useState } from "react";

export default function SearchBar(params) {
    const [query, setQuery] = useState("");
    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleChange}
            />
            <p>Uppercase Output: {query.toUpperCase()}</p>
        
        </div>
    )
}