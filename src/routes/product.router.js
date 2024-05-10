import { Router } from 'express';
import { addProduct, deleteProduct, getProduct, getProductById, updateProduct } from '../controllers/products.js';
//import ProductManager from '../dao/productManager.js' //FILE SYSTEM MANAGER

const router = Router();

router.get('/', getProduct); 

router.get('/:pid', getProductById);

router.post('/', addProduct);

router.put('/:pid', updateProduct);

router.delete('/:pid', deleteProduct);

export default router;