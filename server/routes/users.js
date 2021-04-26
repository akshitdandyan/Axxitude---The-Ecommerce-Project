import express from 'express';
import { registerUser,getUser,seller_Account,getProductsFromSellers,sellerLogin, lauchSellerProduct,getLaunchedProducts, deleteLaunchedProduct, incClickOnProduct } from '../controllers/users.js';

const router = express.Router();

router.post('/register', registerUser);
router.post(`/login`,getUser);
router.post('/seller-account-registration',seller_Account)
router.get('/sellerproducts',getProductsFromSellers)
router.get('/seller-login',sellerLogin)
router.post('/launchproduct',lauchSellerProduct)
router.get('/get-launched-products',getLaunchedProducts)
router.post('/deleteproduct', deleteLaunchedProduct);
router.patch('/seller-product-clicked',incClickOnProduct)

export default router;