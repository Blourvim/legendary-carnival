import bcrypt from 'bcrypt';
import UserModal from "../models/Schemas/UserSchema.js";
import isEmail from 'validator/lib/isEmail.js';

const secret = process.env.PASSWORD_SECRET


  const signup = async(req,res)=>{
     const {name,email,plaintextPassword} =req.body;
     console.log(!await UserModal.exists({email:email}))

    try {
        if (!await UserModal.exists({email:email})){
            await bcrypt.hash(plaintextPassword, 10)
            .then(async(hash)=> {
                 UserModal.create({
                    name:name,
                    email:email,
                    password:hash}
                    ,error=> {
                        if (error) console.error(error);
                      })
    
    
                      res.json({yup:'user has been created'});}); 
    
        }
        
    } catch (error) {
        console.error(error)
    }


  
}
export default signup;