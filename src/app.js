//const express=require("express")
import express from "express"; 
import { Server } from "socket.io";
import { engine } from "express-handlebars";

import products from './routes/product.router.js'
import carts from './routes/carts.router.js'
import views from './routes/views.router.js'
import __dirname from "./utlis.js";
import ProductManager from "./dao/productManager.js";


const app = express();
const PORT = 8080;

const p = new ProductManager();

app.use(express.json()); //para recibie info json
app.use(express.urlencoded({extended: true})); //esto sirve cuando se enviar peticiones atravez de formularios html, esto hace serializar, transforma toda la data para poder leer.
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/', views);
app.use('/api/products', products);
app.use('/api/carts', carts);

const expressServer = app.listen(PORT, () => {console.log(`Corriendo aplicacion en el puerto${PORT}`);});
const socketServer = new Server (expressServer);

socketServer.on ('connection', socket =>{
    
    const productos = p.getProduct();
    socket.emit('productos', productos);

    socket.on('argegarProucto', producto=>{
        const result = p.addProduct(producto);
    });
});

