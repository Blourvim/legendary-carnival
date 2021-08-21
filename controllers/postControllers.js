import Tweet from '../models/Schemas/TweetSchema.js';
import User from '../models/Schemas/UserSchema.js';

export const create = async (req, res) => {

    try { 
        const body = req.body.body;
        const user = req.user.id


        Tweet.create({ body, user })
        .then(docs=>{
            User.findByIdAndUpdate(user,{'$push':{posts:docs._id}})
            .exec()
        res.json({docs})
        })
        .catch(err=>{if(err){

            console.log(err)

        }})
    
    
    }
    catch { if (err) console.error(err) }

};

export const favorite = async (req, res) => {
    
    try {
        const tweet = req.body.postId;
    const user = req.user.id;
    const target = await Tweet.findById(tweet)
    console.log(req.body)

        if (target.favoriters.includes(user) == false) {
            await Tweet.updateOne({ _id: tweet }, { "$push": { favoriters: user }, "$set": { favoritesCount: target.favoritesCount + 1 } },
                { safe: true, upsert: true, new: true, useFindAndModify: false })
                console.log("favorited succesfully")
                res.status(201).json("favorited")
            return
        } else {
            target.unfavorite(user, () => { console.log("unfavorited succesfully") });
            res.status(201).json("unfavorited")

        }


    } catch (error) {
        console.log(error)
    }
}

export const comment = async (req, res) => {
    const comment = req.body.commentBody;
    const user = req.user
    const tweet = req.body.postId;

    try {
        const target = await Tweet.findById(tweet)
    target?.addComment(user, comment, () => { console.log("saved comment") })
    res.status(201).json({'message':'yes'})
    } catch (error) {
        console.log(error)
    }

    
}

export const getFeed = async (req, res) => {
try {

    const feed =await Tweet
    .limitedList({perPage:req.perPage||10})
    .populate('user','name')
    .exec()

    res.status(200).json(feed)
    
} catch (error) {
    console.error(error)
}

}

export const getPost = async(req,res)=>{

    try {
        const result = await Tweet
    .findById(req.params.id)
    .populate('user','name')
    .exec()
res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
    
}

export const sendText =async(req,res)=>{


try {
    const body = req.body
const deposit = await User.findById("61085a6a834814001550843e")
deposit.comments.push({body})
deposit.save()
res.status(200).json('Message sent')
}
 catch (error) {
res.status(400).json({err:error})
    
}
}