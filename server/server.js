import express from "express";
import cors  from "cors";
import dotenv from 'dotenv';
dotenv.config()
const PORT = 4000;
const databaseURI = process.env.DATABASE_URI
import mongoose from "mongoose";
import LocalStrategy from 'passport-local';

import indexRoutes from "./routes/index.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";


import passport from "passport";

import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import UserModal from './models/Schemas/UserSchema.js';
import bcrypt from 'bcrypt';
const app = express();


passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((userId, cb) => {
  UserModal.findById(userId)
      .then((user) => {
          cb(null, user);
      })
      .catch(err => cb(err))
});
app.use(express.json({
  type: ['application/json', 'text/plain']
}))
app.use(express.urlencoded({extended: true}));


mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify:false

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
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());


  passport.use(new LocalStrategy.Strategy(
      function(username, password, cb) {
        UserModal.findOne({ email: username }, (err, user)=> {
          if (err) { return cb(err); }
          if (!user) { return cb(null, false); }
          if (!bcrypt.compare(password,user.password,)) { return cb(null, false); }
          console.log(user)
         return cb(null, user);
        });
      }
    ));


    app.use(cors( {
      origin:"http://localhost:3000",
      credentials:true,
      methods:['GET', 'PUT', 'POST']
      
      }));

app.use('/',indexRoutes);
app.use('/post',postRoutes);
app.use('/user',userRoutes);

