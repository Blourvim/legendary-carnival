import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import  isEmail  from 'validator';
const { Schema } = mongoose;
  
  const userSchema = mongoose.Schema({
      name: {
          type: String,
          required: true,
          trim: true,
          maxlength: 15
      },
      email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
        //  validate: value => {
        //      if (!validator.isEmail(value)) {
        //          throw new Error({error: 'Invalid Email address'})
        //       }
        //   }
      },
      password: {
          type: String,
          required: true,
          minLength: 7
      },
    posts:[
 { type: Schema.ObjectId, ref: "Tweet" }

    ],
    comments:[{ 
            type:String
          }],
    private:{
          type:Boolean,
          default:false,
      },
    friends:[{
              type:String
          }],
    friendInvites:[{
          type:String
        }],
  })
  
 /**  userSchema.pre('save', async function (next) {
      // Hash the password before saving the user model
      const user = this
      if (user.isModified('password')) {
          user.password = await bcrypt.hash(user.password, 8)
      }
      next()
  })
  */
  userSchema.methods.generateAuthToken = async function() {
      // Generate an auth token for the user
      const user = this
      const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
      user.tokens = user.tokens.concat({token})
      await user.save()
      return token
  }
  
  userSchema.statics.findByCredentials = async (email, password) => {
      // Search for a user by email and password.
      const user = await User.findOne({ email} )
      if (!user) {
          throw new Error({ error: 'Invalid login credentials' })
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (!isPasswordMatch) {
          throw new Error({ error: 'Invalid login credentials' })
      }
      return user
  }
  
export default mongoose.model('User',userSchema);