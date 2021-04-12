import express from 'express';

import { registerUser,getUser } from '../controllers/users.js';

const router = express.Router();

router.post('/register', registerUser);
router.post(`/login`,getUser);

export default router;