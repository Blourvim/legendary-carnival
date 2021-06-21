import PostModal from '../models/Schemas/postSchema';

export const createPost =(req,res)=>{
const text = req.body.text;
const date = Date.now();
const owner = req.user.id


try
    {PostModal.create({text,date,owner})}
catch{if(err)console.error(err)}

};

