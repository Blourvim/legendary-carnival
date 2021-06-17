import express from "express";
import cors  from "cors";
import dotenv from 'dotenv';
dotenv.config()
const PORT = 4000;
const databaseURI = process.env.DATABASE_URI
import mongoose from "mongoose";


import indexRoutes from "./routes/index.js";
import passport from "passport";

import session from 'express-session'
import MongoStore from 'connect-mongo'


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(databaseURI, {
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



const sessionStore = MongoStore.create({mongoUrl: databaseURI, collectionName: 'sessions' });


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store:sessionStore,
  cookie:{
    maxAge:1000 * 60 * 60 * 24
  }
}));
app.use(passport.initialize());
app.use(passport.session());

//app.use((req,res,next)=>{
  //console.log(req.session);
  //console.log(req.user);
 // next();
//})

app.use('/',indexRoutes);
