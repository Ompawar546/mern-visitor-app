import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css';


const Greeting = () => {
    const [data, setData] = useState({ name: "", joke: "" });

    useEffect(() => {
        const fetchLatestData = async () => {
            const response = await axios.get("http://localhost:5000/api/latest");
            setData(response.data);
        };

        fetchLatestData();
    }, []);

    return (
        <div>
            <h1>Greeting</h1>
            {data.name ? (
                <>
                    <p>Hello, {data.name}!</p>
                    <p>Here's a joke for you: {data.joke}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Greeting;
