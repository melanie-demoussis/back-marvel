require("dotenv").config();

const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
app.use(express.json());
app.use(cors());

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
app.all("*", (req, res) => {
  res.status(404).json({ mesage: "This route doesn't exist" });
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
