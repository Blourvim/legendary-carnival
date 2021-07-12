import Tweet from '../models/Schemas/TweetSchema.js';
import User from '../models/Schemas/UserSchema.js';

export const create = async (req, res) => {
    const body = req.body.body;
    const user = req.user.id
    try { Tweet.create({ body, user }) }
    catch { if (err) console.error(err) }

};

export const favorite = async (req, res) => {
    const tweet = req.body.postId;
    const user = req.user.id;
    const target = await Tweet.findById(tweet)
    console.log(req.body)

    try {
        if (target.favoriters.includes(user) == false) {
            await Tweet.updateOne({ _id: tweet }, { "$push": { favoriters: user }, "$set": { favoritesCount: target.favoritesCount + 1 } },
                { safe: true, upsert: true, new: true, useFindAndModify: false })
                console.log("favorited succesfully")
            return
        } else {
            target.unfavorite(user, () => { console.log("unfavorited succesfully") });

        }


    } catch (error) {
        console.log(error)
    }
}

export const comment = async (req, res) => {
    console.log(req.body)
    const comment = req.body.commentBody;
    const user = req.user
    const tweet = req.body.postId;
    const target = await Tweet.findById(tweet)
    target.addComment(user, comment, () => { console.log("saved comment") })
}

export const getFeed = async (req, res) => {
try {

    const feed =await Tweet.limitedList({perPage:req.perPage||10})

    res.status(200).json(feed)
    
} catch (error) {
    console.error(error)
}

}

export const getPost = async(req,res)=>{
    const result = await Tweet.findById(req.params.id)
res.status(200).json(result)
}