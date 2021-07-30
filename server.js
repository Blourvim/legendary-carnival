import express from "express";
import cors  from "cors";
import dotenv from 'dotenv';
dotenv.config()
const PORT = process.env.PORT || 4000;
const databaseURI = process.env.MONGODB_URI
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

// process.on('unhandledRejection', (error, promise) => {
//   console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
//   console.log(' The error was: ', error );
// });



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
if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('./client/build'));


}
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
      origin:`*`,
      credentials:true,
      methods:['GET', 'PUT', 'POST']
      
      }));

app.use('/api',indexRoutes);
app.use('/api/post',postRoutes);
app.use('/api/user',userRoutes);

