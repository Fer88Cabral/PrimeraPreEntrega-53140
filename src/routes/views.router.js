import { Router } from 'express'; //import { productModel } from '../dao/model/products.js';
import {getProductsService} from '../services/products.js'; //import ProductManager from '../dao/productManager.js' //FILE SYSTEM MANAGER
import {getCartByIdService} from '../services/carts.js';

const router = Router();

router.get('/',async(req, res) =>{
    const {payload} = await getProductsService({}); //const productos = await productModel.find().lean();
    return res.render('home',{productos: payload, styles:'styles.css', title:'Home'});
});

router.get('/realtimeproducts',(req, res) =>{ //cambio de realTimeProducts (no tener en cuenta esto ;) 
    return res.render('realTimeProducts', {title:'Real Time'});
});

router.get('/chat',(req, res) =>{
    return res.render('chat', {styles:'chat.css', title:'Chat'});
}); 

router.get('/products', async(req,res) => {
    const result = await getProductsService({...req.query});
    return res.render('products', {title:'productos', result, styles:'products.css'})
});

router.get('/cart/:cid', async(req, res)=>{
    const {cid} = req.params;
    const carrito = await getCartByIdService(cid);
    return res.render('cart', {Title:'carrito', carrito, styles:'cart.css'});
});

export default router;  