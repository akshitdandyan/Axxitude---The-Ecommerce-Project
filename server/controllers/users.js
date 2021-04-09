import express from 'express';

import PostMessage from '../models/postMessage.js';

const router = express.Router();
export const registerUser = async (req, res) => {
    const { firstname,lastname,email,address,occupation,phone,password,cpassword} = req.body;
    console.log("JUMBa",firstname)
    const newPostMessage = new PostMessage({ firstname,lastname,email,address,occupation,phone,password,cpassword })

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export default router;