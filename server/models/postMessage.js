import mongoose from 'mongoose';

const postSchema = mongoose.Schema({ 
    firstname:String,
    lastname:String,
    email:String,
    address:String,
    occupation:String,
    phone:Number,
    password:String,
    cpassword:String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage; 