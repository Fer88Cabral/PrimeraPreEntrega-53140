import { Router } from 'express'; 
import {LoginPost, cartIdView, chatView, homeView, loginGet, Logout, productsView, realTimeProductsView, registerGet, registerPost} from '../controllers/views.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/',  auth, homeView);
router.get('/realtimeproducts', auth, realTimeProductsView);
router.get('/chat',  auth, chatView);
router.get('/products',  auth, productsView);
router.get('/cart/:cid',  auth, cartIdView);
router.get('/login', loginGet);
router.post('/login', LoginPost);
router.get('/register', registerGet);
router.post('/register', registerPost);

router.get('/logout', Logout);

export default router;  