require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const cors=require("cors")
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("hello"));
app.get("/user", (req, res) => res.send("hello user"));

app.listen(PORT, () => {
  console.log("server started on port 8080");
});
