import Tweet from '../models/Schemas/TweetSchema.js';
import UserModal from '../models/Schemas/UserSchema.js';
import passport from 'passport'




export const signIn = async(req,res)=>{
  
  passport.authenticate('local',
 { failureRedirect: '/api/signin-failure',
  successRedirect:'/api/data' ,

}),(err,req,res,next)=>{console.log(err);next()}
}


export const getUser = async(req,res)=>{
  console.log(req.user)
    res.redirect(`/api/user/${req.user._id}`)
        
}

export const getUserById = async(req,res)=>{

const userId = req.params.user
console.log(req.params)


try {
  const userInfo = await UserModal
.findById(userId)
.populate('posts')
.exec()

if(userInfo){
  res.status(200).json({userInfo})
  return
}
res.status(404)



} catch (error) {
  console.log(error)
}



}
export const validate =async(req,res)=>{
res.status(200).json({'user':'validated'})

}