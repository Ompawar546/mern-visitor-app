import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './style.css';


const App = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/data", { name });
        navigate("/greet");
    };

    return (
        <div>
            <h1>Welcome</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default App;
