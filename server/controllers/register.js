import bcrypt from 'bcrypt';
import User from "../Schemas/userSchema.js";
import isEmail from 'validator/lib/isEmail';

const secret = process.env.PASSWORD_SECRET


export const register =async(req,res)=>{


    const {name,email,plaintextPassword} =req.body;
    try {

        if(isEmail(email)){
            bcrypt.hash(plaintextPassword, saltRounds =10)
            .then((hash)=> {
                User.create({
                    name:name,
                    email:email,
                    password:hash}
                    ,error=> {
                        if (err) console.error(error);
                      })
    
    
                      res.json({yup:'user has been created'});}); 
    
        }
        
    } catch (error) {
        console.error(error)
    }


  
}