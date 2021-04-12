import express from 'express';

import RegisteredUser from '../models/postMessage.js';

const router = express.Router();
export const registerUser = async (req, res) => {
    const { firstname,lastname,email,address,occupation,phone,password,cpassword} = req.body;
    const shouldReturn = await RegisteredUser.find({email:email})
    if(shouldReturn.length){
        console.log("Should have returned")
        res.status(400).json(false)
        returned
    }
    const newPostMessage = new RegisteredUser({ firstname,lastname,email,address,occupation,phone,password,cpassword })
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const getUser = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await RegisteredUser.find({email:email});
        res.status(200).json(user)
    }catch(error){
        console.log("CONTROLLERS",error)
    }
}

export default router;