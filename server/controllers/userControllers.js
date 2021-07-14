import Tweet from '../models/Schemas/TweetSchema.js';
import UserModal from '../models/Schemas/UserSchema.js';
import passport from 'passport'




export const signIn = async(req,res)=>{
  passport.authenticate('local',
 { failureRedirect: '/signin-failure',
  successRedirect:'/data' ,

}),(err,req,res,next)=>{console.log(err);next()}
}


export const getUser = async(req,res)=>{
  console.log(req.user)
    res.redirect(`/user/${req.user._id}`)
        
}

export const getUserById = async(req,res)=>{

const UserId = req.params.user
console.log("hi")
const userInfo = await UserModal.findById(UserId)

if(userInfo){
  res.status(200).json({userInfo})
  return
}
res.status(404)

}
