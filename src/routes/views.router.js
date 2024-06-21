import { Router } from 'express';
import {Login, cartIdView, chatView, homeView, loginGet, Logout, productsView, realTimeProductsView, registerGet, registerPost} from '../controllers/views.js';
import { admin, auth } from '../middleware/auth.js';
import passport from 'passport';

const router = Router();

router.get('/', homeView);
router.get('/realtimeproducts', [auth, admin], realTimeProductsView);
router.get('/chat',  auth, chatView);
router.get('/products',  auth, productsView);

router.get('/cart/:cid',  auth, cartIdView);

router.get('/login', loginGet);
router.get('/register', registerGet);
router.get('/logout', Logout);
router.post('/register', passport.authenticate('register', {failureRedirect:'/register'}), registerPost);
router.post('/login', passport.authenticate('login', {failureRedirect:'/login'}), Login);    
router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req,res)=>{ });
router.get('/login-github-callback', passport.authenticate('github', {failuresRedirect:'/register'}), Login);

export default router;  