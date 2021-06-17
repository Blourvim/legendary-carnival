import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/Schemas/userSchema';
import bcrypt from 'bcrypt';


export default  initialize =(passport)=>{

    passport.use(new LocalStrategy.Strategy(
        function(username, password, done) {
          User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!bcrypt.compare(password,user.password,)) { return done(null, false); }
            return done(null, user);
          });
        }
      ));
}
 //lets keep as reminder
//const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});

