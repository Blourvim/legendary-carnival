import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = mongoose.Schema({
    text:{
        type:String,
        
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    owner:{
        type:String
    }

});


export default mongoose.model('Post',postSchema);
  