import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema({
    Name:String,
    Email:String,
    Message:String,
    Date:{
        type:Date,
        default: new Date()
    }
})

const feedback = mongoose.model('feedback',feedbackSchema)

export default feedback