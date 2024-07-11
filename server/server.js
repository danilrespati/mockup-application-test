require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const registerRoutes = require("./routes/register");
const authRoutes = require("./routes/auth");
const formRoutes = require("./routes/formRoute");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use("/api/register", registerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/form", formRoutes);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Home Page");
});

const port = process.env.PORT || 8080;
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to database successfully!");
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((error) => {
    console.log(error);
    console.log("Could not connect to database!");
  });
