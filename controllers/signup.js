import bcrypt from 'bcrypt';
import UserModal from "../models/Schemas/UserSchema.js";
import isEmail from 'validator/lib/isEmail.js';
import isLength from 'validator/lib/isLength.js';

const secret = process.env.PASSWORD_SECRET


  const signup = async(req,res)=>{
      
      try {
          const {username,email,password} =req.body;

            if(!isLength(password,{min:8,max:32})){
            res.status(409).json({message:'Password is too short'})
                return
            }


            if(!isEmail(email)){
            res.status(409).json({message:'Email is not valid'})
            return
            }

        if(await UserModal.exists({name:username})){
            res.status(409).json({message:'User with username already exists'})
            return

        }

          if (!await UserModal.exists({email:email}) ){

            await bcrypt.hash(password, 10)
            .then(async(hash)=> {
                 UserModal.create({
                    name:username,
                    email:email,
                    password:hash}
                    ,error=> {
                        if (error) res.status(409).json({message:'there has been an error'})

                      })
    
    
                      res.json({message:'user has been created'});}); 
    
        }
        else{
            res.status(409).json({message:'User already exists with this email'})

        }
        
    } catch (error) {
res.json(error)    }


  
}
export default signup;