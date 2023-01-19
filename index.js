require("dotenv").config();
const express = require("express");
const cors=require("cors")
const PORT = process.env.PORT;
const UserRouter=require("./src/routes/user.route")
const connect=require("./src/config/db")
const app = express();
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/user",UserRouter)
app.get("/", (req, res) => res.send("hello"));


app.listen(PORT, async() => {
 try {
  await connect()
   console.log("server started on port 8080");
 } catch (error) {
  console.log(error);
 }
 });
