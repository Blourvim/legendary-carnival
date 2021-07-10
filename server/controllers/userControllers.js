import Tweet from '../models/Schemas/TweetSchema.js';
import User from '../models/Schemas/UserSchema.js';
import passport from 'passport'




export const signIn = async(req,res)=>{passport.authenticate('local',
 { failureRedirect: '/signin-failure',
  successRedirect:'/data' ,

}),(err,req,res,next)=>{console.log(err);next()}
}