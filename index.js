require("dotenv").config();

const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
// const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
// mongoose.set("strictQuery", true);
// mongoose.connect(
//   "mongodb://https://lereacteur-marvel-api.herokuapp.com/characters"
// );

app.get("/characters", async (req, res) => {
  try {
    const name = req.query.name || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );
    console.log(response.data);
    res.status(200).json(response.data);

    console.log("ça fonctionne");
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
});

app.get("/characters/page2", async (req, res) => {
  try {
    const name = req.query.name || "";
    const skip = req.query.skip || "100";
    const limit = req.query.limit || "100";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters/?apiKey=${
        process.env.MARVEL_API_KEY
      }&name=${name}&skip=${100}&limit=${limit}`
    );
    console.log(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
});
app.get("/comics", async (req, res) => {
  try {
    const title = req.query.title || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/?apiKey=${process.env.MARVEL_API_KEY}&title=${title}&skip=${skip}&limit=${limit}
    `
    );

    console.log(response.data);
    console.log("liste des comics");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId || "null";

    // console.log(req.params);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    console.log(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
