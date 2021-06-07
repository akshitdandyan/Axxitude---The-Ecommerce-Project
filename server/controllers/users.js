import RegisteredUser from '../models/RegisterUser.js';
import SellerAccount from '../models/SellerAccount.js';
import SellerProduct from '../models/SellerProduct.js';
import feedback from '../models/Feedback.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

//CLIENT
export const registerUser = async (req, res) => {
    const { firstname, lastname, email, address, phone, password, image, googleUser } = req.body;
    try {
        const userExists = await RegisteredUser.findOne({ email: email });
        if (googleUser && userExists) {
            const token = jwt.sign({ email: userExists.email, id: userExists._id }, 'test', { expiresIn: "1h" });
            return res.status(200).json({ newUser: userExists, token, type:"Welcome Back" })
        } else if (googleUser) {
            const newUser = await RegisteredUser.create({ firstname, lastname, email, image, googleUser })
            const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: "1h" });
            return res.status(200).json({ newUser, token, type:"Welcome To Axxitude. Keep Exploring." })
        }
        if (userExists) return res.status(400).json(false);
        const hashedpassword = await bcrypt.hash(password, 12);
        const newUser = await RegisteredUser.create({ firstname, lastname, email, address, phone, image, password: hashedpassword, googleUser })
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: "2m" });
        res.status(200).json({ newUser, token })
    } catch (error) {
        console.log(error);
        res.sendStatus(500).json({ message: "something went wrong." });
    }
}
// google user not providing password phone etc. Solve it.
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existing_user = await RegisteredUser.findOne({ email: email, password: password });
        res.json(existing_user)
        if (existing_user) {
            const isPasswordCorrect = await bcrypt.compare(password, existing_user.password)
            if (isPasswordCorrect) res.status(200).json(existing_user)
        } else {
            res.status(400).json(false)
        }
    } catch (error) {
        console.log("CONTROLLERS", error)
        res.sendStatus(400)
    }
}


export const addToCart = async (req, res) => {
    const cartData = req.body;
    try {
        await RegisteredUser.findOneAndUpdate(
            { email: cartData.userEmail },
            { $push: { cart: cartData.product } }
        )
        console.log("Added to Cart");
    } catch (error) {
        console.log("WOOPS", error);
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { productID, userID } = req.body;
        const user = await RegisteredUser.findById(userID);
        const updatedCart = user.cart.filter((cartItem) => cartItem._id != productID)
        await RegisteredUser.findByIdAndUpdate(userID, { cart: updatedCart }, { new: true });
        res.status(200).json('cart updated')
    } catch (error) {
        console.log(error);
        res.status(500)
    }
}

export const buyItem = async (req, res) => {
    const { userID, product } = req.body;
    try {
        await RegisteredUser.findByIdAndUpdate(userID, { $push: { itemsToBeBought: product } }, { new: true });
        const SellerEmail = product.SellerEmail;
        const seller = SellerAccount.find({ Email: SellerEmail })
        console.log(seller);
        var soldProducts = 0;
        if (seller.ProductsSold !== undefined) {
            soldProducts = seller.ProductsSold
        }
        const hm = await SellerAccount.findOneAndUpdate({ Email: SellerEmail }, { ProductsSold: soldProducts + 1 }, { new: true })
        console.log("ITEM BOUGHT");
        res.status(200).json('success');
    } catch (error) {
        console.log(error);
    }
}

export const cancelOrder = async (req, res) => {
    const { userID, product } = req.body;
    try {
        const user = await RegisteredUser.findById(userID);
        const updatedItemsToBeBought = user.cart.filter((Item) => Item._id != product._id)
        await RegisteredUser.findByIdAndUpdate(userID, { itemsToBeBought: updatedItemsToBeBought }, { new: true })

        res.status(200).json("success")
    } catch (error) {
        console.log(error);
    }
}

export const updateAddress = async (req, res) => {
    const { userID, new_address } = req.body;
    try {
        const updatedDetails = await RegisteredUser.findByIdAndUpdate(userID, { address: new_address }, { new: true });
        res.status(200).json(updatedDetails)
    } catch (error) {
        console.log(error);
    }
}

export const postReview = async (req, res) => {
    const { productID, review } = req.body;
    console.log(review);
    try {
        await SellerProduct.findByIdAndUpdate(productID, { $push: { Reviews: review } }, { new: true });
        console.log('Review Added');
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
    }
}

export const incClickOnProduct = async (req, res) => {
    const { SellerEmail } = req.body
    const currSeller = await SellerAccount.find({ Email: SellerEmail })
    const currProductsClicked = currSeller[0].ProductsClicked
    await SellerAccount.findOneAndUpdate({ Email: SellerEmail }, { ProductsClicked: currProductsClicked + 1 }, { new: true });
    console.log('CLICKED API');
    res.status(200).json(true);
}

export const getProductsFromSellers = async (req, res) => {
    try {
        const sellerProducts = await SellerProduct.find();
        res.status(200).json(sellerProducts);
    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

// Feedbacks
export const newFeedback = async (req, res) => {
    const { name, email, message } = req.body;
    const newFeedBack = feedback({ Name: name, Email: email, Message: message });
    try {
        await newFeedBack.save()
        res.status(200)
    } catch (error) {
        console.log(error);
    }
}

