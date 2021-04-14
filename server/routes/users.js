import express from 'express';
import { registerUser,getUser,seller_Account,getProductsFromSellers } from '../controllers/users.js';

const router = express.Router();

router.post('/register', registerUser);
router.post(`/login`,getUser);
router.post('/seller',seller_Account)
router.get('/sellerproducts',getProductsFromSellers)

export default router;