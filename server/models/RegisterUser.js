import mongoose from 'mongoose';

const userSchema = mongoose.Schema({ 
    firstname:String,
    lastname:String,
    email:String,
    address:String,
    phone:Number,
    password:String,
    cpassword:String,
    image:String,
    googleUser:Boolean,
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
        default: new Date().toISOString(),
    },
})

// var RegisteredUser = mongoose.model('temp_registered_user', userSchema);
var RegisteredUser = mongoose.model('encrypt_test_user', userSchema);


export default RegisteredUser; 