import { Router } from 'express';
import { productModel } from '../dao/model/products.js';
//import ProductManager from '../dao/productManager.js' //FILE SYSTEM MANAGER
const router = Router();

router.get('/',async(req, res) =>{
    const productos = await productModel.find().lean();
    return res.render('home',{productos, styles:'styles.css', title:'Home'});
});

router.get('/realtimeproducts',(req, res) =>{ //cambio de realTimeProducts (no tener en cuenta esto ;) 
    return res.render('realTimeProducts', {title:'Real Time'});
});

router.get('/chat',(req, res) =>{
    return res.render('chat', {styles:'chat.css', title:'Chat'});
}); 

export default router;  