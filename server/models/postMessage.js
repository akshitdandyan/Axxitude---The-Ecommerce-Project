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
    image:String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var RegisteredUser = mongoose.model('temp_registered_user', postSchema);

export default RegisteredUser; 