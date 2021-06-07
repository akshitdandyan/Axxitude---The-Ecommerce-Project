import express from 'express';
import dotenv from 'dotenv';
import{ registerUser, signin, getProductsFromSellers,incClickOnProduct, addToCart,removeFromCart, updateAddress, buyItem, cancelOrder,postReview, newFeedback }from '../controllers/users.js';
import { sellerLogin,lauchSellerProduct,deleteLaunchedProduct,seller_Account,updateSellerData,addBankDetail,sponserNewProduct,getLaunchedProducts } from '../controllers/seller.js';
import auth from '../middleware/auth.js';
dotenv.config();

const router = express.Router();
// Store
router.post('/register', registerUser);
router.post(`/login`, signin);
router.get('/get-launched-products', getLaunchedProducts);
router.patch('/seller-product-clicked', incClickOnProduct);
router.post('/add-to-cart', addToCart);
router.post('/remove-from-cart', removeFromCart);
router.post('/update-address', updateAddress);
router.post('/buy-item', auth,buyItem);
router.post('/cancel-order', cancelOrder);
router.post('/post-product-review', postReview);
router.post('/post-feedback', newFeedback);

// Seller
router.get('/seller-login', sellerLogin);
router.get('/sellerproducts', getProductsFromSellers);
router.post('/launchproduct', lauchSellerProduct);
router.post('/deleteproduct', deleteLaunchedProduct);
router.post('/seller-account-registration', seller_Account);
router.post('/update-seller-account', updateSellerData)
router.post('/yupiDetalio', addBankDetail)
router.post('/sponser-new-product', sponserNewProduct)

export default router;