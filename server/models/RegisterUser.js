import mongoose from 'mongoose';

const userSchema = mongoose.Schema({ 
    firstname:String,
    lastname:String,
    email:String,
    address:String,
    occupation:String,
    phone:Number,
    password:String,
    cpassword:String,
    image:String,
    cart:{
        type:Array,
        default:[]
    },
    itemsToBeBought:{
        type:Array,
        default:[]
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var RegisteredUser = mongoose.model('temp_registered_user', userSchema);

export default RegisteredUser; 