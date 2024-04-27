import { Router } from 'express';
import ProductManager from '../dao/productManager.js'

const router = Router();

router.get('/',(req, res) =>{
    const p = new ProductManager();
    const productos = p.getProduct();
    return res.render('home',{productos, styles:'styles.css'});
});

router.get('/realTimeProducts',(req, res) =>{
    return res.render('realTimeProducts');
});

export default router;  