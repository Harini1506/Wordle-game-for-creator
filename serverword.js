const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your MongoDB connection string
const MONGODB_URI = "mongodb://localhost:27017/wordle";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const WordleSchema = new mongoose.Schema({
  word: String,
  hint: String,
  dailyNumber: Number,
});


const Wordle = mongoose.model("Wordle", WordleSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint to save Wordle data to the database
app.post("/save-wordle", async (req, res) => {
  try {
    const { word, hint, dailyNumber } = req.body;

    // Create a new Wordle document
    const wordle = new Wordle({ word, hint, dailyNumber });
    
    // Save the Wordle document to the database
    await wordle.save();

    res.status(200).json({ message: "Wordle data saved successfully!" });
  } catch (error) {
    console.error("Error saving Wordle data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to retrieve Wordle data from the database
app.get("/get-wordle", async (req, res) => {
  try {
    // Retrieve Wordle data from the database
    const wordleData = await Wordle.find().sort({ _id: -1 }).limit(1);

    // Send the latest Wordle data to the client
    res.status(200).json(wordleData[0]);
  } catch (error) {
    console.error("Error retrieving Wordle data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});