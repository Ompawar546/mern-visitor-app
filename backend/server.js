const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

const dataSchema = new mongoose.Schema({ 
        name: String, 
        joke: String 
    });    
const Data = mongoose.model("Data", dataSchema);

app.post("/api/data", async (req, res) => {
    const { name } = req.body;

    // Fetch a joke from an external API
    const jokeResponse = await fetch("https://official-joke-api.appspot.com/random_joke");
    const jokeData = await jokeResponse.json();
    const joke = `${jokeData.setup} - ${jokeData.punchline}`;

    // Save name and joke to the database
    const newData = new Data({ name, joke });
    await newData.save();
    res.status(201).json({ message: "Data stored", name, joke });
});

app.get("/api/latest", async (req, res) => {
    const latestEntry = await Data.findOne().sort({ _id: -1 });
    if (!latestEntry) return res.status(404).json({ error: "No data found" });
    res.status(200).json(latestEntry);
});




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
