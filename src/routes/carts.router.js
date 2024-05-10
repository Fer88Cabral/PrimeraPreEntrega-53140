import { Router } from 'express';
import { addProductInCart, createCart, getCartById } from '../controllers/carts.js';
//import CartsManager from "../dao/cartsManager.js"; //FILE SYSTEM MANAGER
const router = Router();

router.get('/:cid', getCartById);

router.post('/', createCart);

router.post('/:cid/product/:pid', addProductInCart);

export default router;