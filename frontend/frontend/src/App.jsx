import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [input, setInput] = useState("");
    const [data, setData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/data", { input });
        fetchData(); // Refresh data
        setInput(""); // Clear input
    };

    const fetchData = async () => {
        const response = await axios.get("http://localhost:5000/api/data");
        setData(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>MERN App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter something"
                />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.input}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;