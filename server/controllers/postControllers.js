import Tweet from '../models/Schemas/TweetSchema.js';
import User from '../models/Schemas/UserSchema.js';

export const createPost =(req,res)=>{
    console.log("hello")
const body = req.body.text;
const user = req.user.id


try
    {Tweet.create({body,user})}
catch{if(err)console.error(err)}

};

export const favorite =async(req,res)=>{
    const tweet = req.body.id;
    const user = req.user.id;
    const target = await Tweet.findById(tweet)
    if(target.favoriters.includes(user) ==false){
    try {
       await Tweet.updateOne({_id:tweet},{"$push":{favoriters:user},"$set":{favoritesCount:target.favoritesCount+1}},
        {safe: true, upsert: true, new : true, useFindAndModify:false})
        return
    } catch (error) {
        console.log(error)
    }
          
    }

}
