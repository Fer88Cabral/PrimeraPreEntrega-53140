//const express=require("express")
import express from "express"; 
import products from './routes/product.router.js'
import carts from './routes/carts.router.js'

const app = express();
const PORT = 8080;

app.use(express.json()); //para recibie info json
app.use(express.urlencoded({extended: true})); //esto sirve cuando se enviar peticiones atravez de formularios html, esto hace serializar, transforma toda la data para poder leer.

app.get('/',(req,res)=>{
    return res.send('primera pre entrega');
});

app.use('/api/products', products);
app.use('/api/carts', carts);

app.listen(PORT, () => {
    console.log(`Corriendo aplicacion en el puerto${PORT}`);
});