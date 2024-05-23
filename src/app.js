import express from "express"; 
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import 'dotenv/config';

import products from './routes/product.router.js'
import carts from './routes/carts.router.js'
import views from './routes/views.router.js'
import __dirname from "./utlis.js";                     
import {dbConnection} from "./database/config.js"
//import { productModel } from "./dao/model/products.js";
import {messageModel} from "./dao/model/messages.js";
import { getProductsService, addProductService } from "./services/products.js";

const app = express();
const PORT = process.env.PORT;                      

app.use(express.json()); //para recibie info json
app.use(express.urlencoded({extended: true})); //esto sirve cuando se enviar peticiones atravez de formularios html, esto hace serializar, transforma toda la data para poder leer.
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', views);
app.use('/api/products', products);
app.use('/api/carts', carts);

await dbConnection();

const expressServer = app.listen(PORT, () => {console.log(`Corriendo aplicacion en el puerto${PORT}`);});
const io = new Server (expressServer);

io.on ('connection', async(socket) =>{

    //Products
    const {payload} = await getProductsService({}); //const productos = p.getProduct(); -/ productModel.find
    const produtos = payload;
    socket.emit('productos', payload);
    socket.on('agregarProducto', async (producto)=>{
        const newProduct = await addProductService({...producto}); //const result = p.addProduct({...producto}); - const newProduct = await productModel.create({...producto});
        if(newProduct){
            productos.push(newProduct)
            socket.emit('productos', productos);
        }
    });

    // Chat messages
    const messages = await messageModel.find(); //obtenemos todos nuestros modelos
    socket.emit('message', messages);

    socket.on('message', async (data) => {
        const newMessage = await messageModel.create({...data});
        if(newMessage){
            const messages = await messageModel.find();
            io.emit('messageLogs', messages)
        }
    });

    socket.broadcast.emit('nuevo_user');
});

