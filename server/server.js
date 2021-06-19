import express from "express";
import cors  from "cors";
import dotenv from 'dotenv';
dotenv.config()
const PORT = 4000;
const databaseURI = process.env.DATABASE_URI
import mongoose from "mongoose";
import LocalStrategy from 'passport-local';

import indexRoutes from "./routes/index.js";
import passport from "passport";

import session from 'express-session';
import MongoStore from 'connect-mongo';
import UserModal from './models/Schemas/userSchema.js';
import bcrypt from 'bcrypt';
const app = express();


app.use((req,res,next)=>{
  console.log(req.body);
  console.log(req.user);
 next();
})

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((userId, cb) => {
  User.findById(userId)
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
  useCreateIndex:true

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


  passport.use(new LocalStrategy.Strategy(
      function(usernames, password, cb) {
        console.log(password)
        console.log(usernames)
        UserModal.findOne({ email: usernames }, (err, user)=> {
          if (err) { return cb(err); }
          if (!user) { return cb(null, false); }
          if (!bcrypt.compare(password,user.password,)) { return cb(null, false); }
         return cb(null, user);
        });
      }
    ));

//lets keep as reminder
//const LocalStrategy === require('passport-local').Strategy; ===LocalStrategy.Strategy



app.use(cors());

app.use('/',indexRoutes);
