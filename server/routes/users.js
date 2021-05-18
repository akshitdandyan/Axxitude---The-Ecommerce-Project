import express from 'express';
import { registerUser,getUser,seller_Account,getProductsFromSellers,
        sellerLogin, lauchSellerProduct,getLaunchedProducts, deleteLaunchedProduct,
        incClickOnProduct, addToCart,removeFromCart, updateAddress, buyItem, cancelOrder, postReview, sponserNewProduct, newFeedback, updateSellerData, addBankDetail 
    } from '../controllers/users.js';

const router = express.Router();

router.post('/register', registerUser);
router.post(`/login`,getUser);
router.post('/seller-account-registration',seller_Account);
router.get('/sellerproducts',getProductsFromSellers);
router.get('/seller-login',sellerLogin);
router.post('/launchproduct',lauchSellerProduct);
router.get('/get-launched-products',getLaunchedProducts);
router.post('/deleteproduct', deleteLaunchedProduct);
router.patch('/seller-product-clicked',incClickOnProduct);
router.post('/add-to-cart',addToCart);
router.post('/remove-from-cart',removeFromCart);
router.post('/update-address',updateAddress);
router.post('/buy-item',buyItem);
router.post('/cancel-order',cancelOrder);
router.post('/post-product-review',postReview);
router.post('/sponser-new-product',sponserNewProduct)
router.post('/post-feedback',newFeedback);
router.post('/update-seller-account',updateSellerData)
router.post('/yupiDetalio',addBankDetail)

export default router;