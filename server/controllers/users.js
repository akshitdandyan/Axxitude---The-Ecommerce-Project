import RegisteredUser from '../models/RegisterUser.js';
import SellerAccount from '../models/SellerAccount.js';
import SellerProduct from '../models/SellerProduct.js';
import feedback from '../models/Feedback.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'; 
import cron from 'node-cron';
dotenv.config();

//CLIENT
export const registerUser = async (req, res) => {
    const { firstname, lastname, email, address, phone, password, image, googleUser } = req.body;
    try {
        const userExists = await RegisteredUser.findOne({ email: email });
        if (googleUser && userExists) {
            const token = jwt.sign({ email: userExists.email, id: userExists._id }, 'test', { expiresIn: "1h" });
            return res.status(200).json({ newUser: userExists, token, type: "Welcome Back" })
        } else if (googleUser) {
            const newUser = await RegisteredUser.create({ firstname, lastname, email, image, googleUser })
            const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: "1h" });
            return res.status(200).json({ newUser, token, type: "Welcome To Axxitude. Keep Exploring." })
        }
        if (userExists) return res.status(400).json(false);
        const hashedpassword = await bcrypt.hash(password, 12);
        const newUser = await RegisteredUser.create({ firstname, lastname, email, address, phone, image, password: hashedpassword, googleUser })
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ newUser, token })
    } catch (error) {
        console.log(error);
        res.sendStatus(500).json({ message: "something went wrong." });
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existing_user = await RegisteredUser.findOne({ email: email });
        if (existing_user) {
            const isPasswordCorrect = await bcrypt.compare(password, existing_user.password)
            if (isPasswordCorrect) {
                const token = jwt.sign({ email: existing_user.email, id: existing_user._id }, 'test', { expiresIn: "1h" });
                return res.status(200).json({ newUser: existing_user, token })
            } else console.log('PROBLEM'); res.status(400).json(false)
        } else {
            res.status(400).json(false)
        }
    } catch (error) {
        console.log("CONTROLLERS", error)
        res.sendStatus(400)
    }
}

export const updatedData = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await RegisteredUser.findById(id);
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ newUser: result, token })
    } catch (error) {
        res.status(400)
    }
}

export const addToCart = async (req, res) => {
    const cartData = req.body;
    try {
        await RegisteredUser.findByIdAndUpdate(
            cartData.id,
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
        await RegisteredUser.findByIdAndUpdate(userID, { cart: updatedCart });
        res.status(200).json('cart updated')
    } catch (error) {
        console.log(error);
        res.status(500)
    }
}

export const buyItem = async (req, res) => {
    const { userID, product } = req.body;
    if (!req.authUserID) {
        return res.status(400).json({ message: " NOt AuthoRiZed" })
    }
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
        res.status(200).json({newUser:updatedDetails})
    } catch (error) {
        console.log(error);
    }
}

export const postReview = async (req, res) => {
    const { productID, review } = req.body;
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
        console.log('operation started');
        const sellerProducts = await SellerProduct.find();
        console.log('operation ended');
        return res.status(200).json(sellerProducts);
    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

// Feedbacks

export const newFeedback = async (req, res) => {
    const { name, email, message } = req.body;
    console.log("YUMPO");
    // const newFeedBack = feedback({ Name: name, Email: email, Message: message });
    // try {
    //     await newFeedBack.save()
    //     res.status(200)
    // } catch (error) {
    //     console.log(error);
    // }
    
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'akshitdandyan5287@gmail.com',
    //         pass: '_8Vr_uQZHGhdvR!'
    //     }
    // })

    const transporter = nodemailer.createTransport({
        server:"smtp.yandex.com",
        service: 'Yandex',
        auth: {
            user: 'info@eraaxit.ml',
            pass: 'irvbsvmszylhmvkq'
        }
    })

    const mailOptions = {
        from: 'Contact Team Axxitude <info@eraaxit.ml>',
        to: email,
        subject: 'FROM CONTACT TEAM AXXITUDE',
        text: `Hi, ${name},Thanks For Contacting Us, We will soon reach out to you regarding your message'.`,
        html: {path:"EmailTEMPLATES/emailtemplatefeedback/index.html"}
    }

    transporter.sendMail(mailOptions, (err,info)=>{
        if(err) return console.log("WOOPS",err);
        else return console.log("SENT",info.response);
    })

}


cron.schedule("35 19 * * *",() => {
    console.log("JUMBA");
    const transporter = nodemailer.createTransport({
        server:"smtp.yandex.com",
        service: 'Yandex',
        auth: {
            user: 'info@eraaxit.ml',
            pass: 'irvbsvmszylhmvkq'
        }
    })

    const mailOptions = {
        from: 'Contact Team Axxitude <info@eraaxit.ml>',
        to: "akshitdandyan@outlook.com",
        subject: 'FROM CONTACT TEAM AXXITUDE',
        text: `Hi, dear,Thanks For Contacting Us, We will soon reach out to you regarding your message'.`,
        html: {path:"EmailTEMPLATES/emailtemplatefeedback/index.html"}
    }

    transporter.sendMail(mailOptions, (err,info)=>{
        if(err) return console.log("WOOPS",err);
        else return console.log("SENT",info.response);
    })
})








// OTHER WAY OF SENDING MAILS
// var API_KEY = process.env.MAILGUN_API_KEY;
//     const DOMAIN = "sandbox7715f0a2eae04ab58661594fc866cd6e.mailgun.org";
//     const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
//     const data = {
//         from: 'Catalina from Axxitude <postmaster@sandbox7715f0a2eae04ab58661594fc866cd6e.mailgun.org>',
//         to: email,
//         subject: 'Thanks for contacting Axxitude',
//         text: 'We will soon reply to your message.',
//         html: '<div style="font-family:Arial;text-align:center;color:white"><h1 style="color:white;">We appreciate your efforts to bring your message to us.</h1><div style="color:white;font-size:20px;">We will soon reply to you.</div><h3 style="color:green;">Stay Tuned & Happy Shopping.</div></h3></div>'

//     };
//     try {
//         await mg.messages().send(data, function (error, body) {
//             console.log('SUCCESS',body);
//         });
//     } catch (error) {
//         console.warn('WARN',error)
//     }


