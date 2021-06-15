import express from "express";
const app = express();
import cors  from "cors";
const PORT = 4000;
const databaseUrl = "mongodb+srv://admin:6CauyxOFUlCp2csW@cluster0.opexh.mongodb.net/movnet?retryWrites=true&w=majority";
import mongoose from "mongoose";
app.use(cors());

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});

app.router()