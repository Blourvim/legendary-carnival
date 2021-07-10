import Tweet from '../models/Schemas/TweetSchema.js';
import User from '../models/Schemas/UserSchema.js';

export const create = async (req, res) => {
    const body = req.body.body;
    const user = req.user.id
    try { Tweet.create({ body, user }) }
    catch { if (err) console.error(err) }

};

export const favorite = async (req, res) => {
    const tweet = req.body.id;
    const user = req.user.id;
    const target = await Tweet.findById(tweet)
    try {
        if (target.favoriters.includes(user) == false) {
            await Tweet.updateOne({ _id: tweet }, { "$push": { favoriters: user }, "$set": { favoritesCount: target.favoritesCount + 1 } },
                { safe: true, upsert: true, new: true, useFindAndModify: false })
            return
        } else {
            target.unfavorite(user, () => { console.log("done") });

        }


    } catch (error) {
        console.log(error)
    }
}

export const comment = async (req, res) => {
    const comment = req.body.comment;
    const user = req.user
    const tweet = "60d4236f873f204b49efe25e";
    const target = await Tweet.findById(tweet)
    target.addComment(user, comment, () => { console.log("saved") })
}

export const getFeed = async (req, res) => {

try {

    const feed =await Tweet.limitedList({perPage:2})

    res.status(200).json(feed)
    
} catch (error) {
    console.error(error)
}

}