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

const dataSchema = new mongoose.Schema({ input: String });
const Data = mongoose.model("Data", dataSchema);

app.post("/api/data", async (req, res) => {
    const { input } = req.body;
    const newData = new Data({ input });
    await newData.save();
    res.status(201).send("Data stored");
});

app.get("/api/data", async (req, res) => {
    const data = await Data.find();
    res.status(200).json(data);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
