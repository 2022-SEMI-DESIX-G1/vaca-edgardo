require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectionDB } = require("./db/connection");
const app = express();

app.use(cors());
app.use(express.json())

const { PORT = 3000 } = process.env.PORT;

app.use('/api/pokemon', require('./routes/pokemon'))

app.listen(PORT, () => {
  connectionDB();
  console.log(`Running on port ${PORT}...`);
});